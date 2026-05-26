import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  size: {
    type: String,
    required: true
  },

  cost: {
    type: Number
  }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;