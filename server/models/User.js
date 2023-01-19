import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  lastName: {
    type: String,
    required: true,
    min: 2,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    max: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 5,
  },
  applications: {
    type: Array,
  },
  jobs: {
    type: Array,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
  },
  stack: {
    type: Array,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
