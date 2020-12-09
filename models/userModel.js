const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: {
      type: String,
      required: true,
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
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    position: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    avaliable: {
      type: Boolean,
      default: false,
    },
    imageURL: {
      type: String,
    },
    attendance: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
