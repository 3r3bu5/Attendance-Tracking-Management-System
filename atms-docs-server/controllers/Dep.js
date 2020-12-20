"use strict";

var utils = require("../utils/writer.js");
var Dep = require("../service/DepService");

module.exports.assignHeadOfDepartment = function assignHeadOfDepartment(
  req,
  res,
  next,
  body,
  depId,
  origin
) {
  Dep.assignHeadOfDepartment(body, depId, origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createDepartment = function createDepartment(
  req,
  res,
  next,
  body,
  origin
) {
  Dep.createDepartment(body, origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteADepartment = function deleteADepartment(
  req,
  res,
  next,
  depId,
  origin
) {
  Dep.deleteADepartment(depId, origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteDepartments = function deleteDepartments(
  req,
  res,
  next,
  origin
) {
  Dep.deleteDepartments(origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editADepartment = function editADepartment(
  req,
  res,
  next,
  body,
  depId,
  origin
) {
  Dep.editADepartment(body, depId, origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getDepartments = function getDepartments(
  req,
  res,
  next,
  origin
) {
  Dep.getDepartments(origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getSpecificDepartment = function getSpecificDepartment(
  req,
  res,
  next,
  depId,
  origin
) {
  Dep.getSpecificDepartment(depId, origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
