import User from "../models/User.js";
import bcrypt from "bcrypt";

export const addUser = async (req, res) => {
  const email = req.body.email;
  console.log("🚀 ~ file: general.js:6 ~ addUser ~ email", email);
  // const user = await User.findOne({ email });

  try {
    const potentialUser = await User.findOne({ email });
    console.log("🚀 ~ file: general.js:8 ~ addUser ~ user", user);
    if (potentialUser) return res.status(403).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
    });
    user.save();
    res.status(200).json({ message: "ok" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
