const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const ReqSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    requestedBy: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      min: 1, // 1 pending , 2 approved , 3 not-approved
      max: 3,
      default: 1,
    },
    reason: {
      type: String,
      required: true,
    },
    reviewedBy: {
      type: String,
    },
  },
  { timestamps: true }
);
const Request = mongoose.model("Request", ReqSchema);

module.exports = Request;
