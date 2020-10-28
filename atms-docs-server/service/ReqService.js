'use strict';


/**
 * [DANGER] Delete All requests information
 * [DANGER] Delete All requests information (This operation can only performed by Admins users) 
 *
 * no response value expected for this operation
 **/
exports.deleteRequests = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * DELETE  a specific request
 * DELETE  a specific request  This operation can be performed by:  * Admins users * The leaving request owner
 *
 * reqId String 
 * no response value expected for this operation
 **/
exports.deleteRequestsReqId = function(reqId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get All requests information
 * Get All requests information (This operation response is based on how made the request)  * if the request was issued by the admin: the response will contain all leaving requests * if the request was issued by the department head : the response will contain all leaving requests inside this department * if the request was issued by a normal user: the response will contain all leaving requests issued by this user 
 *
 * returns List
 **/
exports.getRequests = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "requestedBy" : {
    "hasLV" : true,
    "LVID" : "LVID",
    "isAdmin" : true,
    "createdAt" : "createdAt",
    "password" : "password",
    "avaliable" : true,
    "imageUrl" : "imageUrl",
    "name" : "name",
    "id" : "id",
    "position" : "position",
    "age" : "age",
    "email" : "email",
    "updatedAt" : "updatedAt"
  },
  "reason" : "reason",
  "createdAt" : "createdAt",
  "id" : "id",
  "status" : 1.1601656380922023,
  "updatedAt" : "updatedAt"
}, {
  "requestedBy" : {
    "hasLV" : true,
    "LVID" : "LVID",
    "isAdmin" : true,
    "createdAt" : "createdAt",
    "password" : "password",
    "avaliable" : true,
    "imageUrl" : "imageUrl",
    "name" : "name",
    "id" : "id",
    "position" : "position",
    "age" : "age",
    "email" : "email",
    "updatedAt" : "updatedAt"
  },
  "reason" : "reason",
  "createdAt" : "createdAt",
  "id" : "id",
  "status" : 1.1601656380922023,
  "updatedAt" : "updatedAt"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get a specific request
 * Get a specific request  This operation can be performed by: * Admins users * The leaving request owner * The department head of the leaving request owner
 *
 * reqId String 
 * returns Request
 **/
exports.getRequestsReqId = function(reqId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "requestedBy" : {
    "hasLV" : true,
    "LVID" : "LVID",
    "isAdmin" : true,
    "createdAt" : "createdAt",
    "password" : "password",
    "avaliable" : true,
    "imageUrl" : "imageUrl",
    "name" : "name",
    "id" : "id",
    "position" : "position",
    "age" : "age",
    "email" : "email",
    "updatedAt" : "updatedAt"
  },
  "reason" : "reason",
  "createdAt" : "createdAt",
  "id" : "id",
  "status" : 1.1601656380922023,
  "updatedAt" : "updatedAt"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Post  a new leaving request
 * Post a new leaving request (Any registerd user can perform this operation)
 *
 * body Request  (optional)
 * returns Request
 **/
exports.postRequests = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "requestedBy" : {
    "hasLV" : true,
    "LVID" : "LVID",
    "isAdmin" : true,
    "createdAt" : "createdAt",
    "password" : "password",
    "avaliable" : true,
    "imageUrl" : "imageUrl",
    "name" : "name",
    "id" : "id",
    "position" : "position",
    "age" : "age",
    "email" : "email",
    "updatedAt" : "updatedAt"
  },
  "reason" : "reason",
  "createdAt" : "createdAt",
  "id" : "id",
  "status" : 1.1601656380922023,
  "updatedAt" : "updatedAt"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Accept that specific request
 * This endpoint is to to accept the leaving request issued by user This operation can only be performed by * Admin users * The department head which the user belongs 
 *
 * reqId String 
 * no response value expected for this operation
 **/
exports.postRequestsReqIdAccept = function(reqId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Refuse that specific request
 * This endpoint is to to refuse the leaving request issued by user This operation can only be performed by * Admin users * The department head which the user belongs 
 *
 * reqId String 
 * no response value expected for this operation
 **/
exports.postRequestsReqIdRefuse = function(reqId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Edit  a specific request
 * Edit  a specific request This operation can be performed by:  * Admins users * The leaving request owner
 *
 * body Request  (optional)
 * reqId String 
 * returns Request
 **/
exports.putRequestsReqId = function(body,reqId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "requestedBy" : {
    "hasLV" : true,
    "LVID" : "LVID",
    "isAdmin" : true,
    "createdAt" : "createdAt",
    "password" : "password",
    "avaliable" : true,
    "imageUrl" : "imageUrl",
    "name" : "name",
    "id" : "id",
    "position" : "position",
    "age" : "age",
    "email" : "email",
    "updatedAt" : "updatedAt"
  },
  "reason" : "reason",
  "createdAt" : "createdAt",
  "id" : "id",
  "status" : 1.1601656380922023,
  "updatedAt" : "updatedAt"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

