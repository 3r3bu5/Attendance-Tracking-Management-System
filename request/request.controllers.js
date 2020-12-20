const express = require("express");
const Request = require("./request.model");
const User = require("../user/user.model");
const { request } = require("express");

exports.methodNotallowed = (req, res) => {
  res.status(405);
  res.setHeader("content-type", "application/json");
  res.json({
    error: ` ${req.method} Method is not allowed on ${req.baseUrl} `,
  });
};

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

exports.getAll = (req, res, next) => {
  if (req.user.isAdmin == true) {
    Request.find()
      .populate("requestedBy departmentId", "name")
      .then((requests) => {
        res.status(200);
        res.setHeader("content-type", "application/json");
        res.json(requests);
      })
      .catch((err) => next(err));
  } else if (req.user.headOfDepartmentId != null) {
    Request.find({ departmentId: req.user.headOfDepartmentId })
      .populate("requestedBy departmentId", "name avaliable")
      .then((requests) => {
        res.status(200);
        res.setHeader("content-type", "application/json");
        res.json(requests);
      })
      .catch((err) => next(err));
  } else {
    Request.find({ requestedBy: req.user._id })
      .populate("requestedBy departmentId", "name avaliable")
      .then((requests) => {
        res.status(200);
        res.setHeader("content-type", "application/json");
        res.json(requests);
      })
      .catch((err) => next(err));
  }
};

exports.createOne = (req, res, next) => {
  /* 
     1- check if user's checked in for today 
     if true:
      2- get the user's last request  
        * if user has no request for today => create one
        * if there is request for today => just notify him
     if not:
        * Notify this motherhacker
 
  */

  if (req.user.attendance && req.user.attendance.length > 0) {
    createRequest = () => {
      Request.create({
        requestedBy: req.user._id,
        departmentId: req.user.department,
        reason: req.body.reason,
        date: Date.now(),
      })
        .then((request) => {
          res.status(200);
          res.setHeader("content-type", "application/json");
          res.json({ message: "Request has been sent successfully ", request });
        })
        .catch((err) => next(err));
    };

    const lastAttendance = req.user.attendance[req.user.attendance.length - 1];
    const lastAttendanceEntryTimestamp = lastAttendance.entry.getTime();
    if (lastAttendance.exit.time) {
      res.status(200);
      res.setHeader("content-type", "application/json");
      res.json({
        message:
          "You are already signed out for today! or haven't signed in yet!",
      });
    } else {
      Request.find()
        .sort({ age: -1 })
        .limit(1) // to get the last request of the user
        .then((request) => {
          if (request.length == []) {
            createRequest();
          } else {
            currentDate = new Date();
            lastRequestTimeStamp = request[0].date.getTime();
            const nextCheckIn = new Date(lastRequestTimeStamp);
            nextCheckIn.setHours(nextCheckIn.getHours() + 24);

            if (currentDate.getTime() >= nextCheckIn.getTime()) {
              createRequest();
            } else {
              res.status(200);
              res.setHeader("content-type", "application/json");
              res.json({
                message:
                  "You have already applied for a leaving request for today",
                request,
              });
            }
          }
        })
        .catch((err) => next(err));
    }
  } else {
    res.status(400);
    res.setHeader("content-type", "application/json");
    res.json({
      message: "You have no attendance entry, try checkin first",
    });
  }
};

exports.deleteAll = (req, res, next) => {
  Request.deleteMany({})
    .then((requests) => {
      res.setHeader("content-type", "application/json");
      res.json({ message: "All requests have been deleted successfully " });
    })
    .catch((err) => next(err));
};

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

exports.getOne = (req, res, next) => {
  Request.findById(req.params.reqId)
    .populate("requestedBy departmentId", "name avaliable")
    .then((request) => {
      if (request != null) {
        if (req.user.isAdmin == true) {
          res.status(200);
          res.setHeader("content-type", "application/json");
          res.json(request);
        } else if (
          req.user.headOfDepartmentId &&
          req.user.headOfDepartmentId == request.departmentId._id
        ) {
          res.status(200);
          res.setHeader("content-type", "application/json");
          res.json(request);
        } else if (req.user._id == request.requestedBy._id) {
          res.status(200);
          res.setHeader("content-type", "application/json");
          res.json(request);
        } else {
          res.status(401);
          res.setHeader("content-type", "application/json");
          res.json({ message: "You are not allowed to see this request!" });
        }
      } else {
        res.status(401);
        res.setHeader("content-type", "application/json");
        res.json({ message: "Request doesn't exist!" });
      }
    })
    .catch((err) => next(err));
};

exports.editOne = (req, res, next) => {
  Request.findById(req.params.reqId)
    .then((request) => {
      if (request != null) {
        if (req.user._id == request.requestedBy) {
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
        } else {
          res.status(401);
          res.setHeader("content-type", "application/json");
          res.json({ message: "You are not allowed to edit this request" });
        }
      } else {
        res.status(404);
        res.setHeader("content-type", "application/json");
        res.json({ message: "Request doens't exist" });
      }
    })
    .catch((err) => next(err));
};

exports.deleteOne = (req, res, next) => {
  Request.findById(req.params.reqId)
    .then((request) => {
      if (
        (request != null && req.user._id == request.requestedBy) ||
        req.user.isAdmin == true
      ) {
        request
          .remove()
          .then((request) => {
            res.status(200);
            res.setHeader("content-type", "application/json");
            res.json({ message: "Deleted successfully" });
          })
          .catch((err) => next(err));
      } else {
        err = new Error(
          "request doesn't exists or you are not allowed to delete this request"
        );
        err.statusCode = 404;
        return next(err);
      }
    })
    .catch((err) => next(err));
};

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

exports.acceptRequest = (req, res, next) => {
  Request.findById(req.params.reqId)
    .then((request) => {
      if (request != null) {
        if (
          req.user.isAdmin == true ||
          (req.user.headOfDepartmentId &&
            req.user.headOfDepartmentId == request.departmentId)
        ) {
          User.findById(request.requestedBy)
            .then((user) => {
              const lastAttendance =
                user.attendance[user.attendance.length - 1];
              const lastAttendanceEntryTimestamp = lastAttendance.entry.getTime();
              if (user.attendance && user.attendance.length > 0) {
                if (lastAttendance.exit.time) {
                  //means that user has signed out for today
                  res.status(200);
                  res.setHeader("content-type", "application/json");
                  res.json({
                    message: "User is already signed out for today!",
                  });
                } else {
                  // get the last checkin entry and calculate the total working hours of the employee
                  currentDate = new Date();
                  empWorkedHours =
                    (currentDate.getTime() - lastAttendanceEntryTimestamp) /
                    1000;
                  empWorkedHours /= 60 * 60;
                  request.status = 2;
                  request
                    .save()
                    .then((request) => {
                      lastAttendance.exit.time = currentDate.getTime();
                      lastAttendance.exit.reason = 2;
                      user.avaliable = false;
                      lastAttendance.LVRID = request._id;
                      lastAttendance.hasLVR = true;
                      lastAttendance.workingHours = Math.round(empWorkedHours);
                      user
                        .save()
                        .then((user) => {
                          res.status(200);
                          res.setHeader("content-type", "application/json");
                          res.json({
                            message: "Request has been accepted successfully",
                            request,
                          });
                        })
                        .catch((err) => next(err));
                    })
                    .catch((err) => next(err));
                }
              } else {
                res.status(400);
                res.setHeader("content-type", "application/json");
                res.json({ message: "User has no attendance entry! " });
              }
            })
            .catch((err) => next(err));
        } else {
          res.status(401);
          res.setHeader("content-type", "application/json");
          res.json({
            message: "You are not allowed to perform this operation! ",
          });
        }
      } else {
        res.status(404);
        res.setHeader("Content-Type", "application/json");
        res.json({
          message: "request doesn't exist",
        });
      }
    })
    .catch((err) => next(err));
};

exports.refuseRequest = (req, res, next) => {
  Request.findById(req.params.reqId)
    .then((request) => {
      if (request != null) {
        if (
          req.user.isAdmin == true ||
          (req.user.headOfDepartmentId &&
            req.user.headOfDepartmentId == request.departmentId)
        ) {
          request.status = 3;
          request
            .save()
            .then((request) => {
              res.status(200);
              res.setHeader("content-type", "application/json");
              res.json({
                message: "Request has been refused successfully",
                request,
              });
            })
            .catch((err) => next(err));
        } else {
          res.status(401);
          res.setHeader("content-type", "application/json");
          res.json({
            message: "You are not allowed to perform this operation! ",
          });
        }
      } else {
        res.status(404);
        res.setHeader("Content-Type", "application/json");
        res.json({
          message: "request doesn't exist",
        });
      }
    })
    .catch((err) => next(err));
};
