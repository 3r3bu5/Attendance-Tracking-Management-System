const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

var passportLocalMongoose = require("passport-local-mongoose");

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
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: Number,
      min: 1, //  1- male   2- female 3- other
      max: 3,
    },
    position: {
      type: String,
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.String,
      ref: "Department",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    headOfDepartmentId: {
      type: mongoose.Schema.Types.String,
      ref: "Department",
    },
    imageURL: {
      type: String,
    },
    avaliable: {
      type: Boolean,
      default: false,
    },
    absenceDays: {
      type: Number,
      default: 0,
    },
    attendance: [
      {
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

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const User = mongoose.model("User", UserSchema);

module.exports = User;
