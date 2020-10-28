'use strict';


/**
 * DELETE  a specific department information
 * DELETE a specific department information (This operation can be performed only by Admins users)
 *
 * depId String 
 * no response value expected for this operation
 **/
exports.deleteDepartment = function(depId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * [DANGER] DELETE all departments
 * [DANGER] DELETE all departments information (This operation can be performed only by Admins users)
 *
 * no response value expected for this operation
 **/
exports.deleteDepartments = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get a specific department information
 * Get a specific department information (This operation can be performed only by Admins users or if the request was made by this department's head )
 *
 * depId String 
 * returns Department
 **/
exports.getDepartment = function(depId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "createdAt" : "2000-01-23",
  "name" : "name",
  "depHead" : {
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
  "id" : "id",
  "abbr" : "abbr",
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
 * Get All Depatments info
 * Retrive all departments information (This operation can be performed only by Admins users)
 *
 * returns List
 **/
exports.getDepartments = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "createdAt" : "2000-01-23",
  "name" : "name",
  "depHead" : {
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
  "id" : "id",
  "abbr" : "abbr",
  "updatedAt" : "updatedAt"
}, {
  "createdAt" : "2000-01-23",
  "name" : "name",
  "depHead" : {
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
  "id" : "id",
  "abbr" : "abbr",
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
 * Post a new department
 * Post a new department (This operation can be performed only by Admins users)
 *
 * body Department  (optional)
 * returns Object
 **/
exports.postDepartments = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = { };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Edit a specific department information
 * Edit a specific department information (This operation can be performed only by Admins users)
 *
 * body Object  (optional)
 * depId String 
 * returns Object
 **/
exports.putDepartment = function(body,depId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = { };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

