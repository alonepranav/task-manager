import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
  },
  { timeseries: true, timestamps: true }
);

const User = mongoose.models.User || new mongoose.model("User", userSchema);

export default User;
