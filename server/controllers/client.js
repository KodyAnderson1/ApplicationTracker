import Application from "../models/Application.js";
import User from "../models/User.js";

export const getApplications = async (req, res) => {
  try {
    const user = await User.findById("63701cc1f03239b7f700000e");
    const userApplications = await Application.find({
      _id: { $in: user.applications },
    });
    res.status(200).json(userApplications);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
