const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const DepSchema = new mongoose.Schema(
  {
    _id: { type: String, default: uuidv4 },
    name: {
      type: String,
      required: true,
    },
    abbr: {
      type: String,
      unique: true,
      required: true,
    },
    depHead: {
      type: mongoose.Schema.Types.String,
      ref: "User",
    },
  },
  { timestamps: true }
);
const Department = mongoose.model("Department", DepSchema);

module.exports = Department;
