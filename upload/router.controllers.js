/* eslint-disable no-unused-vars */
const express = require("express");
const multer = require("multer");

const imagePath = "public/images";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagePath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now());
  },
});

const imageFileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(new Error("You can upload only image files!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter });

exports.methodNotallowed = (req, res) => {
  res.status(405);
  res.json({
    error: ` ${req.method} Method is not allowed on ${req.baseUrl} `,
  });
};

exports.uploadSingleMidd = upload.single("imageFile");

exports.uploadSingle = (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(req.file);
};
