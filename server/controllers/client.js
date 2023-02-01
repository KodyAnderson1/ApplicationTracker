import Application from "../models/Application.js";
import User from "../models/User.js";

export const getApplications = async (req, res) => {
  const email = req.user.email;
  // console.log("🚀 ~ file: client.js:6 ~ getApplications ~ email", email);
  // console.log("🚀 ~ file: client.js:6 ~ getApplications ~ email", req.user);
  if (!email) return res.status(400).json({ message: "Unauthorized" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Unauthorized" });

    const userApplications = await Application.find({
      _id: { $in: user.applications },
    });
    console.log("🚀 ~ file: client.js:19 ~ getApplications ~ userApplications", userApplications);
    res.status(200).json(userApplications);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// ! Secure this PLUS redo data grab all applications for user && filter with JS for now
export const getDashboardStats = async (req, res) => {
  console.log("🚀 ~ file: client.js:23 ~ getDashboardStats ~ req", req.user);

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  try {
    const email = req.user.email;
    if (!email) return res.status(400).json({ message: "Unauthorized" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Unauthorized" });

    const userApplications = await Application.find({
      _id: { $in: user.applications },
    });

    const needsAttentionApplications = userApplications.filter(
      (element) => element.updatedAt <= sevenDaysAgo && element.status !== "rejected"
    );

    let review = 0,
      rejected = 0,
      interview = 0,
      assessment = 0,
      accepted = 0;

    userApplications.forEach((element) => {
      if (element.status === "review") review++;
      if (element.status === "rejected") rejected++;
      if (element.status === "interview") interview++;
      if (element.status === "assessment") assessment++;
      if (element.status === "accepted") accepted++;
    });

    // const data = await Application.aggregate([

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

export const addNewAplication = async (req, res) => {
  const email = req.user.email;
  if (!email) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const newApp = { ...req.body, user_id: req.user.id };
    const app = await new Application(newApp).save();
    console.log("🚀 ~ file: client.js:88 ~ addNewAplication ~ app", app);

    user.applications.push(app.id);
    user.save();

    res.status(200).json(app);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSingleApplication = async (req, res) => {
  const email = req.user.email;
  if (!email) return res.status(401).json({ message: "Unauthorized" });

  try {
    const application = await Application.findById(req.params.id);

    if (req.user.id !== application.user_id)
      return res.status(401).json({ message: "Unauthorized" });
    else res.status(200).json(application);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateApplication = async (req, res) => {
  const { email, id: usrId } = req.user;
  console.log("🚀 ~ file: client.js:116 ~ updateApplication ~ email", email);
  if (!email || !usrId) return res.status(401).json({ message: "Unauthorized" });
  console.log("🚀 ~ file: client.js:121 ~ updateApplication ~ application", req.body);

  try {
    const application = await Application.findById(req.body._id);
    console.log("🚀 ~ file: client.js:121 ~ updateApplication ~ application", application);

    if (usrId !== application.user_id) {
      return res.status(401).json({ message: "User does not own Application" });
    } else {
      const result = await application.updateOne(req.body);
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteApplication = async (req, res) => {
  const { email, id: usrId } = req.user;
  // console.log("🚀 ~ file: client.js:133 ~ deleteApplication ~ usrId", usrId);
  if (!email || !usrId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const application = await Application.findById(req.params.id);

    if (usrId !== application.user_id) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      const user = await User.findOne({ email: req.user.email });
      const newUserApplList = user.applications.filter((appl) => appl !== req.params.id);
      user.applications = newUserApplList;
      await user.save();
      await application.delete();
      res.status(200).json({ message: "Delete Successful!" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
