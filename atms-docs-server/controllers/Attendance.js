"use strict";

var utils = require("../utils/writer.js");
var Attendance = require("../service/AttendanceService");

module.exports.deleteAttendanceHistory = function deleteAttendanceHistory(
  req,
  res,
  next,
  origin
) {
  Attendance.deleteAttendanceHistory(origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteHistoryEntry = function deleteHistoryEntry(
  req,
  res,
  next,
  attId,
  origin
) {
  Attendance.deleteHistoryEntry(attId, origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAttendanceHistory = function getAttendanceHistory(
  req,
  res,
  next,
  origin
) {
  Attendance.getAttendanceHistory(origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSpecificHistoryEntry = function getSpecificHistoryEntry(
  req,
  res,
  next,
  attId,
  origin
) {
  Attendance.getSpecificHistoryEntry(attId, origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
