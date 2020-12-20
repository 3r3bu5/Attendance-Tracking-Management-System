"use strict";

/**
 * Delete the full attendance history.
 * * Return the full attendance history of the system. * Access: This operation can only performed by Admins users
 *
 * origin String CORS (optional)
 * returns Object
 **/
exports.deleteAttendanceHistory = function (origin) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Delete a specific entry from the attendance history.
 * * Delete a specific entry from the attendance history. * Access: This operation can only performed by Admins users
 *
 * attId String
 * origin String CORS
 * returns Object
 **/
exports.deleteHistoryEntry = function (attId, origin) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Get the full attendance history.
 * * Return the full attendance history of the system. * Access: This operation can only performed by Admins users
 *
 * origin String CORS (optional)
 * returns Object
 **/
exports.getAttendanceHistory = function (origin) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Get a specific entry from the attendance history.
 * * Get a specific entry from the attendance history. * Access: This operation can only performed by Admins users
 *
 * attId String
 * origin String CORS
 * returns Object
 **/
exports.getSpecificHistoryEntry = function (attId, origin) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};
