'use strict';

var utils = require('../utils/writer.js');
var Req = require('../service/ReqService');

module.exports.deleteRequests = function deleteRequests (req, res, next) {
  Req.deleteRequests()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteRequestsReqId = function deleteRequestsReqId (req, res, next, reqId) {
  Req.deleteRequestsReqId(reqId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRequests = function getRequests (req, res, next) {
  Req.getRequests()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRequestsReqId = function getRequestsReqId (req, res, next, reqId) {
  Req.getRequestsReqId(reqId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postRequests = function postRequests (req, res, next, body) {
  Req.postRequests(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postRequestsReqIdAccept = function postRequestsReqIdAccept (req, res, next, reqId) {
  Req.postRequestsReqIdAccept(reqId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postRequestsReqIdRefuse = function postRequestsReqIdRefuse (req, res, next, reqId) {
  Req.postRequestsReqIdRefuse(reqId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putRequestsReqId = function putRequestsReqId (req, res, next, body, reqId) {
  Req.putRequestsReqId(body, reqId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
