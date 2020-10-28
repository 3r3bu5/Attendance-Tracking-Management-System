'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

module.exports.deleteUsers = function deleteUsers (req, res, next) {
  User.deleteUsers()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUsersUserId = function deleteUsersUserId (req, res, next, userId) {
  User.deleteUsersUserId(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUsers = function getUsers (req, res, next) {
  User.getUsers()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUsersUserId = function getUsersUserId (req, res, next, userId) {
  User.getUsersUserId(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postUsers = function postUsers (req, res, next, body) {
  User.postUsers(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putUsersUserId = function putUsersUserId (req, res, next, body, userId) {
  User.putUsersUserId(body, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
