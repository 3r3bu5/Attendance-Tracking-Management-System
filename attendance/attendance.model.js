const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const AttendanceSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    employees: [
      {
        _id: { type: String, default: uuidv4 },
        employee: {
          required: true,
          type: mongoose.Schema.Types.String,
          ref: "User",
        },
        attended: {
          required: true,
          type: Boolean,
        },
        request: {
          type: mongoose.Schema.Types.String,
          ref: "Request",
        },
      },
    ],
    date: {
      type: Date,
      default: Date.now,
    },
  },

  { timestamps: true }
);

const Attendance = mongoose.model("Attendance", AttendanceSchema);

module.exports = Attendance;
