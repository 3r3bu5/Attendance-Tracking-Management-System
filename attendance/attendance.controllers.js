const express = require("express");
const Attendance = require("./attendance.model");

exports.methodNotallowed = (req, res) => {
  res.status(405);
  res.setHeader("content-type", "application/json");
  res.json({
    error: ` ${req.method} Method is not allowed on ${req.baseUrl} `,
  });
};

/*
@Route      >    METHOD /attendance
@Behavioure >    Return all attendance history / 
                 Delete all attendance history
@Access     >    Admin for listing attendance history /
                 Admin to DELETE all attendance history
*/

exports.getAll = (req, res, next) => {
  // only admin can list all attendance history
  Attendance.find()
    .populate({
      path: "employees employee",
      populate: {
        path: "employee",
        select: "name absenceDays",
      },
    })
    .then((attendance) => {
      res.status(200);
      res.setHeader("content-type", "application/json");
      res.json(attendance);
    })
    .catch((err) => next(err));
};

exports.deleteAll = (req, res, next) => {
  // only admin can delete all attendance history
  Attendance.deleteMany({})
    .then((attendance) => {
      res.setHeader("content-type", "application/json");
      res.json({
        message: "All Attendance history have been deleted successfully ",
      });
    })
    .catch((err) => next(err));
};

/*
@Route      >    METHOD /history/:attId
@Behavioure >    Return a specific attendance entry / 
                 Edit a specific attendance entry / 
                 Delete a specific attendance entry
@Access     >    Admin for listing a specific attendance entry /
                 Admin to DELETE a specific attendance entry
*/

exports.getOne = (req, res, next) => {
  Attendance.findById(req.params.attId)
    .populate({
      path: "employees employee",
      populate: {
        path: "employee",
        select: "name absenceDays",
      },
    })
    .then((attendance) => {
      if (attendance != null) {
        res.status(200);
        res.setHeader("content-type", "application/json");
        res.json(attendance);
      } else {
        err = new Error("Attendance entry doesn't exists");
        err.statusCode = 404;
        return next(err);
      }
    })
    .catch((err) => next(err));
};

exports.deleteOne = (req, res, next) => {
  Attendance.findByIdAndRemove(req.params.attId)
    .then((attendance) => {
      if (attendance != null) {
        res.status(200);
        res.setHeader("content-type", "application/json");
        res.json({ message: "Deleted successfully" });
      } else {
        err = new Error("attendance doesn't exists");
        err.statusCode = 404;
        return next(err);
      }
    })
    .catch((err) => next(err));
};
