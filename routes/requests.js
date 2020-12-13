var express = require("express");
var router = express.Router();

// import Department model
const Request = require("../models/requestModel");

/*
@Route      >    METHOD /requests
@Behavioure >    Return all requests / 
                 Apply for a new request / 
                 Delete all requests
@Access     >    
if the request was issued by the admin: 
    the response will contain all leaving requests.

if the request was issued by the department head :
    the response will contain all leaving requests inside this department

if the request was issued by a normal user:
    the response will contain all leaving requests issued by this user
*/

router.get("/", (req, res, next) => {
  Request.find()
    .then((requests) => {
      res.status(200);
      res.setHeader("content-type", "application/json");
      res.json(requests);
    })
    .catch((err) => next(err));
});

router.post("/", (req, res, next) => {
  Request.create(req.body)
    .then((request) => {
      res.status(200);
      res.setHeader("content-type", "application/json");
      res.json({ message: "Request has been sent successfully ", request });
    })
    .catch((err) => next(err));
});
router.put("/", (req, res, next) => {
  res.status(405);
  res.setHeader("content-type", "application/json");
  res.json({ message: "METHOD is not allowed" });
});
router.delete("/", (req, res, next) => {
  Request.deleteMany({})
    .then((requests) => {
      res.setHeader("content-type", "application/json");
      res.json({ message: "All requests have been deleted successfully " });
    })
    .catch((err) => next(err));
});

/*
@Route      >    METHOD /requests/:reqId
@Behavioure >    Return a specific leaving request / 
                 Edit a specific leaving request / 
                 Delete a specific leaving request
@Access     >    
Get a specific request, This operation can be performed by:
        * Admins users
        * The leaving request owner
        * The department head of the leaving request owner
*/

router.get("/:reqId", (req, res, next) => {
  Request.findById(req.params.reqId)
    .then((request) => {
      if (request != null) {
        res.status(200);
        res.setHeader("content-type", "application/json");
        res.json(request);
      } else {
        err = new Error("request doesn't exists");
        err.statusCode = 404;
        return next(err);
      }
    })
    .catch((err) => next(err));
});

router.post("/:reqId", (req, res, next) => {
  res.status(405);
  res.setHeader("content-type", "application/json");
  res.json({ message: "METHOD is not allowed" });
});
router.put("/:reqId", (req, res, next) => {
  Request.findById(req.params.reqId)
    .then((request) => {
      if (req.body.reason) {
        request.reason = req.body.reason;
      }
      request
        .save()
        .then((request) => {
          res.status(200);
          res.setHeader("Content-Type", "application/json");
          res.json({
            message: "request has been edited successfully",
            request,
          });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

router.delete("/:reqId", (req, res, next) => {
  Request.findByIdAndRemove(req.params.reqId)
    .then((request) => {
      if (request != null) {
        res.status(200);
        res.setHeader("content-type", "application/json");
        res.json({ message: "Deleted successfully" });
      } else {
        err = new Error("request doesn't exists");
        err.statusCode = 404;
        return next(err);
      }
    })
    .catch((err) => next(err));
});

/*
@Route      >    POST /requests/:reqId/accept  /refuse
@Behavioure >    Accept a leaving request submitted by employee / 
                 Refuse a leaving request submitted by employee / 

@Access     >    
Those 2  endpoints is to to accept or refues the leaving request issued by employee.
This operation can only be performed by: 

    * Admin users
    * The department head which the employee belongs
*/

router.post("/:reqId/accept", (req, res, next) => {
  Request.findById(req.params.reqId)
    .then((request) => {
      request.status = 2;
      request
        .save()
        .then((request) => {
          res.status(200);
          res.setHeader("Content-Type", "application/json");
          res.json({
            message: "request has been accepted ",
            request,
          });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

router.post("/:reqId/refuse", (req, res, next) => {
  Request.findById(req.params.reqId)
    .then((request) => {
      request.status = 3;
      request
        .save()
        .then((request) => {
          res.status(200);
          res.setHeader("Content-Type", "application/json");
          res.json({
            message: "request has been refused ",
            request,
          });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

module.exports = router;
