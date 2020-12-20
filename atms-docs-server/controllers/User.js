"use strict";

var utils = require("../utils/writer.js");
var User = require("../service/UserService");

module.exports.assignUserToADepartment = function assignUserToADepartment(
  req,
  res,
  next,
  body,
  userId,
  origin
) {
  User.assignUserToADepartment(body, userId, origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.checkInUser = function checkInUser(req, res, next, origin) {
  User.checkInUser(origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.checkOutUser = function checkOutUser(req, res, next, origin) {
  User.checkOutUser(origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createDefaultAdmin = function createDefaultAdmin(
  req,
  res,
  next,
  userId,
  origin
) {
  User.createDefaultAdmin(userId, origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUsers = function deleteUsers(req, res, next, origin) {
  User.deleteUsers(origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteUsersUserId = function deleteUsersUserId(
  req,
  res,
  next,
  userId,
  origin
) {
  User.deleteUsersUserId(userId, origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllUsers = function getAllUsers(req, res, next, origin) {
  User.getAllUsers(origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAvaliableUsers = function getAvaliableUsers(
  req,
  res,
  next,
  origin
) {
  User.getAvaliableUsers(origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUsersUserId = function getUsersUserId(
  req,
  res,
  next,
  userId,
  origin
) {
  User.getUsersUserId(userId, origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listAllDepartmentsHeads = function listAllDepartmentsHeads(
  req,
  res,
  next,
  origin
) {
  User.listAllDepartmentsHeads(origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.loginUser = function loginUser(
  req,
  res,
  next,
  body,
  userId,
  origin
) {
  User.loginUser(body, userId, origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postUsersUserIdRegister = function postUsersUserIdRegister(
  req,
  res,
  next,
  body,
  userId,
  origin
) {
  User.postUsersUserIdRegister(body, userId, origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putUsersUserId = function putUsersUserId(
  req,
  res,
  next,
  body,
  userId,
  origin
) {
  User.putUsersUserId(body, userId, origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
