"use strict";

var utils = require("../utils/writer.js");
var Req = require("../service/ReqService");

module.exports.createRequest = function createRequest(
  req,
  res,
  next,
  body,
  origin
) {
  Req.createRequest(body, origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteAllRequests = function deleteAllRequests(
  req,
  res,
  next,
  origin
) {
  Req.deleteAllRequests(origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteRequestsReqId = function deleteRequestsReqId(
  req,
  res,
  next,
  reqId,
  origin
) {
  Req.deleteRequestsReqId(reqId, origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllRequests = function getAllRequests(
  req,
  res,
  next,
  origin
) {
  Req.getAllRequests(origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRequestsReqId = function getRequestsReqId(
  req,
  res,
  next,
  reqId,
  origin
) {
  Req.getRequestsReqId(reqId, origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postRequestsReqIdAccept = function postRequestsReqIdAccept(
  req,
  res,
  next,
  reqId,
  origin
) {
  Req.postRequestsReqIdAccept(reqId, origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postRequestsReqIdRefuse = function postRequestsReqIdRefuse(
  req,
  res,
  next,
  reqId,
  origin
) {
  Req.postRequestsReqIdRefuse(reqId, origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putRequestsReqId = function putRequestsReqId(
  req,
  res,
  next,
  body,
  reqId,
  origin
) {
  Req.putRequestsReqId(body, reqId, origin)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
