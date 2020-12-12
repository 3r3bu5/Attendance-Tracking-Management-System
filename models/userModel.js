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
    imageURL: {
      type: String,
    },
    absenceDays: {
      type: Number,
      default: 0,
    },
    attendance: [
      {
        avaliable: {
          type: Boolean,
          default: false,
        },
        workingHours: {
          type: Number,
          default: 0,
        },
        date: {
          type: Date,
          default: Date.now,
        },
        entry: { type: Date },
        exit: {
          time: { type: Date },
          reason: {
            // 1 for normal exit (end of the day)
            // 2 for exit with request
            type: Number,
            default: 1,
            min: 1,
            max: 2,
          },
        },
        hasLVR: {
          type: Boolean,
          default: false,
        },
        LVRID: String,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
