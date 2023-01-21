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

export const getDashboardStats = async (req, res) => {
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  try {
    const user = await User.findById(req.params.id);
    const userApplications = await Application.find({
      _id: { $in: user.applications },
    });
    const total = userApplications.length;

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
          attention: {
            $sum: { $cond: [{ $lte: ["$updatedAt", sevenDaysAgo] }, 1, 0] },
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
      attention,
      total,
      applications: userApplications,
    };

    res.status(200).json(results);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addNewAplication = async (req, res) => {
  try {
    const user = await User.findById("63701cc1f03239b7f700000e");
    const app = await new Application(req.body).save();

    user.applications.push(app.id);
    user.save();

    res.status(200).json(app);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSingleApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    res.status(200).json(application);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateApplication = async (req, res) => {
  try {
    await Application.findOneAndUpdate({ _id: req.body._id }, req.body).then((result) =>
      res.status(200).json(result)
    );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    Application.deleteOne({ _id: req.params.id }).then(
      res.status(200).json({ message: "Delete Successful!" })
    );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
