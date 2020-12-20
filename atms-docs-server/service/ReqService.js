"use strict";

/**
 * Apply for a new leaving request.
 * Apply for a new leaving request. Access: Any registerd user can perform this operation
 *
 * body Object Reason will be the reason why you should leave early. (optional)
 * origin String CORS
 * returns Object
 **/
exports.createRequest = function (body, origin) {
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
 * [DANGER] Delete All requests information.
 * [DANGER] Delete All requests information  Access: This operation can only performed by Admins users
 *
 * origin String CORS
 * returns Object
 **/
exports.deleteAllRequests = function (origin) {
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
 * DELETE  a specific leaving request.
 * * DELETE  a specific request  * This operation can be performed by:    * Admins users   * The leaving request owner
 *
 * reqId String
 * origin String CORS
 * returns Object
 **/
exports.deleteRequestsReqId = function (reqId, origin) {
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
 * Get All requests information.
 * Get All requests information (This operation response is based on who made the request)  * if the request was issued by the admin: the response will contain all leaving requests * if the request was issued by the department head : the response will contain all leaving requests inside this department * if the request was issued by a normal user: the response will contain all leaving requests issued by this user
 *
 * origin String CORS
 * returns List
 **/
exports.getAllRequests = function (origin) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = [{}, {}];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Get a specific leaving request.
 * * Get a specific request  * Access: This operation can be performed by:   * Admins users   * The leaving request owner   * The department head of the leaving request owner
 *
 * reqId String
 * origin String CORS
 * returns Object
 **/
exports.getRequestsReqId = function (reqId, origin) {
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
 * Accept a leaving request.
 * * This endpoint is to to accept the leaving request issued by user * Access: This operation can only be performed by:   * Admin users   * The department head which the user belongs
 *
 * reqId String
 * origin String CORS
 * returns Object
 **/
exports.postRequestsReqIdAccept = function (reqId, origin) {
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
 * Refuse a leaving request.
 * * This endpoint is to to refuse the leaving request issued by user * Access: This operation can only be performed by:   * Admin users   * The department head which the user belongs
 *
 * reqId String
 * origin String CORS
 * returns Object
 **/
exports.postRequestsReqIdRefuse = function (reqId, origin) {
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
 * Edit  a specific leaving request.
 * * Edit a specific request. * Access: This operation can be performed by:   * The leaving request owner
 *
 * body Object  (optional)
 * reqId String
 * origin String CORS
 * returns Object
 **/
exports.putRequestsReqId = function (body, reqId, origin) {
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
