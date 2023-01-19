import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
    },
    positionTitle: {
      type: String,
    },
    status: {
      type: String,
      enum: ["review", "rejected", "accepted", "interview", "assessment"],
      required: true,
    },
    location: {
      type: String,
    },
    url: {
      type: String,
    },
    jobType: {
      type: String,
      enum: ["remote", "in-person", "hybrid"],
    },
    salary: {
      type: Number,
    },
    stack: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", ApplicationSchema);
export default Application;
