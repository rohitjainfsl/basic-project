import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      unique: true,
    },
    dob: {
      type: Date,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
  },
  { timestamps: true },
);

const User = model("user", userSchema);
export default User;
