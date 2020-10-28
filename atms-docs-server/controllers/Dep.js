'use strict';

var utils = require('../utils/writer.js');
var Dep = require('../service/DepService');

module.exports.deleteDepartment = function deleteDepartment (req, res, next, depId) {
  Dep.deleteDepartment(depId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteDepartments = function deleteDepartments (req, res, next) {
  Dep.deleteDepartments()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getDepartment = function getDepartment (req, res, next, depId) {
  Dep.getDepartment(depId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getDepartments = function getDepartments (req, res, next) {
  Dep.getDepartments()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postDepartments = function postDepartments (req, res, next, body) {
  Dep.postDepartments(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putDepartment = function putDepartment (req, res, next, body, depId) {
  Dep.putDepartment(body, depId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
