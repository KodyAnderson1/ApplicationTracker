import User from "../models/User.js";

/*********** OLD ************ */

// export const getLogin = async (req, res) => {
//   // * Authenticate User

//   try {
//     const user = await User.findOne({
//       email: req.body.email,
//     }).select("-password");

//     if (user) {
//       const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
//       res.status(200).json({ user: token });
//     } else {
//       res.status(200).json({ message: "No User Found" });
//     }
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// export const getUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id).select("-password");

//     if (user) {
//       const token = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET);
//       res.status(200).json({ user: token });
//     } else {
//       res.status(200).json({ message: "No User Found" });
//     }
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };
