"use strict";

/**
 * Assign the head of the department
 * Assign the head of department. Access: Only admins can assign the head of the department.
 *
 * body Object the depHead is the id of the user who is gonna be the head of the department. (optional)
 * depId String
 * origin String
 * returns Object
 **/
exports.assignHeadOfDepartment = function (body, depId, origin) {
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
 * Create new department
 * * Create new department. * Access: This operation can be performed only by Admins users
 *
 * body Object You need to insert the name and abbr of the new department. (optional)
 * origin String CORS
 * returns Object
 **/
exports.createDepartment = function (body, origin) {
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
 * DELETE  a specific department information
 * * Delete a specific department information * Access: This operation can be performed only by Admins users,
 *
 * depId String
 * origin String CORS
 * returns Object
 **/
exports.deleteADepartment = function (depId, origin) {
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
 * [DANGER] DELETE all departments
 * * DELETE all departments information * Access: This operation can be performed only by Admins users
 *
 * origin String
 * no response value expected for this operation
 **/
exports.deleteDepartments = function (origin) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
};

/**
 * Edit a specific department information
 * * Edit a specific department information * Access: This operation can be performed only by Admins users,
 *
 * body Object enter the new name and abbr of the department. (optional)
 * depId String
 * origin String
 * returns Object
 **/
exports.editADepartment = function (body, depId, origin) {
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
 * Get all depatments info
 * * Retrive all departments information. * Access: This operation can be performed only by Admins users
 *
 * origin String CORS
 * returns List
 **/
exports.getDepartments = function (origin) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = ["", ""];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Get a specific department information
 * * Get a specific department information * Access: This operation can be performed only by Admins users,   if the request was made by this department's head
 *
 * depId String
 * origin String CORS
 * returns Object
 **/
exports.getSpecificDepartment = function (depId, origin) {
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
