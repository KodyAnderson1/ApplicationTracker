import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  positionTitle: {
    type: String,
  },
  hiredOn: {
    type: String,
    required: true,
    min: 5,
  },
  salary: {
    type: Number,
  },
});

const Job = mongoose.model("Job", JobSchema);
export default Job;
