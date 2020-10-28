'use strict';


/**
 * [DANGER] Delete all users
 * DELETE all users information (This operation can only performed by Admin) 
 *
 * no response value expected for this operation
 **/
exports.deleteUsers = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Delete a specific user info
 * Delete a specific user info (This operation can only performed by Admin) 
 *
 * userId String 
 * no response value expected for this operation
 **/
exports.deleteUsersUserId = function(userId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get All users information
 * Retrive all users information (This operation can only performed by Admins users) 
 *
 * returns List
 **/
exports.getUsers = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
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
}, {
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
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrive a specific user info
 * Retrive a specific user info (This operation can only performed by Admin) 
 *
 * userId String 
 * returns User
 **/
exports.getUsersUserId = function(userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
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
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Post a new user 
 * Post a new user(This operation can only performed by Admin) 
 *
 * body Object  (optional)
 * returns User
 **/
exports.postUsers = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
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
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Edit  a specific user info
 * Edit a specific user info (This operation can only performed by Admin) 
 *
 * body Object  (optional)
 * userId String 
 * returns Object
 **/
exports.putUsersUserId = function(body,userId) {
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

