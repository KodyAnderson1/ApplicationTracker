import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.json(400).json({ message: "All fields are required" });

  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) return res.status(401).json({ message: "Unauthorized" });

  const accessToken = jwt.sign(
    {
      UserInfo: {
        email: foundUser.email,
        id: foundUser._id,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        role: foundUser?.role,
        applications: foundUser.applications,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" } // ! Change
  );

  const refreshToken = jwt.sign({ email: foundUser.email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", refreshToken, {
    httpOnly: true, // accessible only by web server
    secure: true, // https
    sameSite: "None", // cross-site cookie
    maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expiry: set to match refresh token
  });

  // send accessToken containing email
  res.json({ accessToken });
};

export const refresh = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (error, decoded) => {
    if (error) return res.status(403).json({ message: "Forbidden" });

    const foundUser = await User.findOne({ email: decoded.email });
    if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          id: foundUser._id,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          role: foundUser?.role,
          applications: foundUser.applications,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" } // ! Change
    );
    res.json({ accessToken });
  });
};

export const logout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie Cleared" });
};
