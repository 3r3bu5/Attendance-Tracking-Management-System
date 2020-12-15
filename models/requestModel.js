const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const ReqSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    requestedBy: {
      required: true,
      type: mongoose.Schema.Types.String,
      ref: "User",
    },
    status: {
      type: Number,
      min: 1, // 1 pending , 2 approved , 3 not-approved
      max: 3,
      default: 1,
    },
    departmentId: {
      required: true,
      type: mongoose.Schema.Types.String,
      ref: "Department",
    },
    reason: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    reviewedBy: {
      type: mongoose.Schema.Types.String,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Request = mongoose.model("Request", ReqSchema);

module.exports = Request;
