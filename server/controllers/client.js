import Application from "../models/Application.js";
import User from "../models/User.js";

export const getApplications = async (req, res) => {
  const email = req.user;
  if (!email) return res.status(400).json({ message: "Unauthorized" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Unauthorized" });

    const userApplications = await Application.find({
      _id: { $in: user.applications },
    });
    res.status(200).json(userApplications);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// ! Secure this PLUS redo data grab all applications for user && filter with JS for now
export const getDashboardStats = async (req, res) => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  try {
    const email = req.user;
    if (!email) return res.status(400).json({ message: "Unauthorized" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Unauthorized" });

    const userApplications = await Application.find({
      _id: { $in: user.applications },
    });

    const needsAttentionApplications = userApplications.filter(
      (element) => element.updatedAt <= sevenDaysAgo && element.status !== "rejected"
    );

    const data = await Application.aggregate([
      {
        $group: {
          _id: null,
          review: {
            $sum: { $cond: [{ $eq: ["$status", "review"] }, 1, 0] },
          },
          rejected: {
            $sum: { $cond: [{ $eq: ["$status", "rejected"] }, 1, 0] },
          },
          interview: {
            $sum: { $cond: [{ $eq: ["$status", "interview"] }, 1, 0] },
          },
          assessment: {
            $sum: { $cond: [{ $eq: ["$status", "assessment"] }, 1, 0] },
          },
          accepted: {
            $sum: { $cond: [{ $eq: ["$status", "accepted"] }, 1, 0] },
          },
        },
      },
    ]);

    const { review, rejected, interview, assessment, accepted, attention } = data[0];
    const results = {
      review,
      rejected,
      interview,
      assessment,
      accepted,
      attention: needsAttentionApplications.length,
      total: userApplications.length,
      applications: userApplications,
      needAttentionApplications: needsAttentionApplications,
    };

    res.status(200).json(results);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// ! Make sure req.body stays the same -OR- change here
export const addNewAplication = async (req, res) => {
  const email = req.user;
  if (!email) return res.status(400).json({ message: "Unauthorized" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Unauthorized" });

    const app = await new Application(req.body).save();

    user.applications.push(app.id);
    user.save();

    res.status(200).json(app);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// ! Secure && check to make sure app belongs to user requesting it
export const getSingleApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    res.status(200).json(application);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// ! Secure && check to make sure app belongs to user updating it
export const updateApplication = async (req, res) => {
  try {
    await Application.findOneAndUpdate({ _id: req.body._id }, req.body).then((result) =>
      res.status(200).json(result)
    );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// ! Secure && check to make sure app belongs to user deleting it
export const deleteApplication = async (req, res) => {
  try {
    Application.deleteOne({ _id: req.params.id }).then(
      res.status(200).json({ message: "Delete Successful!" })
    );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
