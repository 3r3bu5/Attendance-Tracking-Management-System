const express = require("express");

// import models
const User = require("./user.model");
const Department = require("../department/department.model");

// import middlewares
const authenticate = require("../middlewares/auth");

// config file
var config = require("../config");

exports.methodNotallowed = (req, res) => {
  res.status(405);
  res.setHeader("content-type", "application/json");
  res.json({
    error: ` ${req.method} Method is not allowed on ${req.baseUrl} `,
  });
};

/*
@Route      >    METHOD /users
@Behavioure >    Return all users / 
                 POST a new user / 
                 Delete all users
@Access     >    Admin for listing users /
                 Admin to POST a new user /
                 Admin to DELETE all users
*/

exports.getAll = (req, res, next) => {
  User.find()
    .populate({
      path: "department depHead",
      populate: {
        path: "depHead",
        select: "name avaliable",
      },
    })
    .then((users) => {
      res.status(200);
      res.setHeader("content-type", "application/json");
      res.json(users);
    })
    .catch((err) => next(err));
};

exports.deleteAll = (req, res, next) => {
  User.deleteMany({})
    .then((User) => {
      res.setHeader("content-type", "application/json");
      res.json({ message: "All users have been deleted successfully " });
    })
    .catch((err) => next(err));
};

/* 

@Route      >    POST /users/register  /login
@Behavioure >    Register an employee / 
                 login as an employee / 
                 
@Access     >    Admin for registering new users /
                 employee to login /
*/

exports.registerNewUser = (req, res, next) => {
  // that means that admin users only can register new accounts
  User.register(
    new User({
      email: req.body.email,
      name: req.body.name,
      department: req.body.department,
      age: req.body.age,
      gender: req.body.gender,
      position: req.body.position,
    }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.json({ err: err });
      } else {
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ err: err });
            return;
          }

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json({ success: true, status: "Registration Successful!" });
        });
      }
    }
  );
};

exports.loginUser = (req, res, next) => {
  var token = authenticate.getToken({ _id: req.user._id });
  res.status(200);
  res.setHeader("Content-Type", "application/json");
  res.json({ status: true, token: token, message: "Logged-In Successful!" });
};

/*

This endpoint is simply to register a new admin user if there is no admin to the system
The admin default information can be found and edited in the config.js file

*/

exports.createDefaultAdmin = (req, res, next) => {
  User.findOne({ isAdmin: true })
    .then((user) => {
      if (user != null) {
        res.status(406);
        res.setHeader("Content-Type", "application/json");
        res.json({ message: "Already there :)" });
      } else {
        Department.create({
          name: "Admins",
          abbr: "Adm",
        })
          .then((department) => {
            User.register(
              new User({
                email: config.adminEmail,
                name: config.adminName,
                age: config.adminAge,
                gender: config.adminGender,
                department: department._id,
                position: "Admin",
                headOfDepartmentId: department._id,
                avaliable: true,
                isAdmin: true,
              }),
              config.adminPass,
              (err, user) => {
                if (err) {
                  res.status = 500;
                  res.setHeader("Content-Type", "application/json");
                  res.json({ err: err });
                } else {
                  user.save((err, user) => {
                    if (err) {
                      res.status = 500;
                      res.setHeader("Content-Type", "application/json");
                      res.json({ err: err });
                      return;
                    }
                    department.depHead = user._id;
                    department
                      .save()
                      .then((department) => {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json({ success: true, status: " Intiliazed!" });
                      })
                      .catch((err) => next(err));
                  });
                }
              }
            );
          })
          .catch((err) => next(err));
      }
    })
    .catch((err) => next(err));
};

/*
@Route      >    METHOD /avaliable
@Behavioure >    List all currently avaliable employees  / 
                 List all currently avaliable employees in a specific department / 
                 
@Access     >   For admins: to list all the avaliable employees
                For head of the department: to list all the avaliable employees of this department
                 
*/

exports.avaliableUsers = (req, res, next) => {
  if (req.user.isAdmin == true) {
    User.find({ avaliable: true })
      .populate("department", "name")
      .select("_id name email department")
      .then((users) => {
        res.status(200);
        res.setHeader("content-type", "application/json");
        res.json({
          message: `there are ${users.length} avaliable employee(s) right now`,
          users,
        });
      })
      .catch((err) => next(err));
  } else if (req.user.headOfDepartmentId != null) {
    User.find({ avaliable: true, department: req.user.headOfDepartmentId })
      .populate("department", "name")
      .select("_id name email department")
      .then((users) => {
        res.status(200);
        res.setHeader("content-type", "application/json");
        res.json({
          message: `there are ${users.length} avaliable employee(s) right now`,
          users,
        });
      })
      .catch((err) => next(err));
  } else {
    res.status(401);
    res.setHeader("content-type", "application/json");
    res.json({ message: "You are not allowed to perform this operation!" });
  }
};

/*
@Route      >    METHOD /users/:userId/enter  /leave
@Behavioure >    check in for a specific user / 
                 checkout for a specific user / 
                 
@Access     >    Specific user to checkin /
                 Specific user to checkout /
                 
*/

exports.userCheckIn = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user != null) {
        if (req.user._id == user._id) {
          const data = {
            entry: Date.now(), // save current time as check-in entry
          };
          startinghour = config.startinghour; // startinghour of the day (remember to use 2 digits ex: if the starting hour is 9 use 09 NOT 9)
          allowanceminutes = config.allowanceminutes; // minutes allowed to check in after workinghour

          /*
            get current hour and minutes to check if the employee can check-in at this time
          */
          currentDate = new Date();
          currentHour = currentDate.toUTCString().substr(17, 2);
          currentMinutes = currentDate.getMinutes();
          console.log(currentHour, currentMinutes);

          if (user.attendance && user.attendance.length > 0) {
            // check if employee has attendance history

            /*
            grab the last attendance day of the employee
            to check if he already signed in for today. 
            or 24 hrs passed from his last entry attendance 
            so he can check-in for today
          */
            const lastCheckIn = user.attendance[user.attendance.length - 1];
            const lastCheckInTimestamp = lastCheckIn.date.getTime();

            const nextCheckIn = new Date(lastCheckInTimestamp);
            nextCheckIn.setHours(nextCheckIn.getHours() + 24); // grab the timestamp of the next day of last attendance entry

            if (currentDate.getTime() >= nextCheckIn.getTime()) {
              // if 24 hrs passed from his last entry

              if (
                currentHour == startinghour &&
                currentMinutes <= allowanceminutes
              ) {
                user.attendance.push(data);
                user.avaliable = true;
                user
                  .save()
                  .then((user) => {
                    res.status(200);
                    res.setHeader("content-type", "application/json");
                    res.json({ message: "DONE! You have signed in today" });
                  })
                  .catch((err) => next(err));
              } else {
                res.status(200);
                res.setHeader("content-type", "application/json");
                res.json({ message: "Sorry, You can't check in at this time" });
              }
            } else {
              res.status(200);
              res.setHeader("content-type", "application/json");
              res.json({ message: "You are already signed in for today" });
            }
          } else {
            if (
              currentHour == startinghour &&
              currentMinutes <= allowanceminutes
            ) {
              user.attendance.push(data);
              user.avaliable = true;
              user
                .save()
                .then((user) => {
                  res.status(200);
                  res.setHeader("content-type", "application/json");
                  res.json({ message: "DONE! You have signed in today" });
                })
                .catch((err) => next(err));
            } else {
              res.status(200);
              res.setHeader("content-type", "application/json");
              res.json({ message: "Sorry, You can't check in at this time" });
            }
          }
        } else {
          res.status(401);
          res.setHeader("content-type", "application/json");
          res.json({
            message: "You are not authorized to check-in as this user",
          });
        }
      } else {
        err = new Error("user doesn't exists");
        err.statusCode = 404;
        return next(err);
      }
    })
    .catch((err) => next(err));
};

exports.userCheckOut = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user != null) {
        if (
          req.user._id == user._id ||
          req.user._id == user.department.depHead._id
        ) {
          workHours = config.workHours; // number of work hours of each day
          /*
            get current hour and minutes to check if the employee completed workhours of the day
        */
          currentDate = new Date();
          currentHour = currentDate.toUTCString().substr(17, 2);
          currentMinutes = currentDate.getMinutes();
          console.log(currentHour, currentMinutes);

          if (user.attendance && user.attendance.length > 0) {
            // check if employee has attendance history

            /*
            grab the last attendance day of the employee
            to check if he already signed out for today. 
          
          */
            const lastAttendance = user.attendance[user.attendance.length - 1];
            const lastAttendanceEntryTimestamp = lastAttendance.entry.getTime();

            if (lastAttendance.exit.time) {
              //means that user has signed out for today
              res.status(200);
              res.setHeader("content-type", "application/json");
              res.json({ message: "You are already signed out for today!" });
            } else {
              // calculate the employee working hours from entry date to exit date
              empWorkedHours =
                (currentDate.getTime() - lastAttendanceEntryTimestamp) / 1000;
              empWorkedHours /= 60 * 60;

              if (empWorkedHours >= workHours) {
                // check if employee has completed the specified workhours
                lastAttendance.exit.time = Date.now();
                lastAttendance.exit.reason = 1;
                user.avaliable = false;
                lastAttendance.workingHours = Math.round(empWorkedHours);
                user
                  .save()
                  .then((user) => {
                    res.status(200);
                    res.setHeader("content-type", "application/json");
                    res.json({
                      message: "DONE! You have signed out for today",
                    });
                  })
                  .catch((err) => next(err));
              } else {
                // employee didn't complete the workhours
                res.status(200);
                res.setHeader("content-type", "application/json");
                res.json({
                  message:
                    "You can't sign out yet!, there is work to do :)) or you can apply for leaving request",
                });
              }
            }
          } else {
            // employee has no attendance entry
            res.status(200);
            res.setHeader("content-type", "application/json");
            res.json({
              message:
                "Sorry, You cant sign out without being signed in for today!",
            });
          }
        } else {
          res.status(401);
          res.setHeader("content-type", "application/json");
          res.json({
            message: "You are not authorized to see this user's info",
          });
        }
      } else {
        // employee doesn't exist
        err = new Error("user doesn't exists");
        err.statusCode = 404;
        return next(err);
      }
    })
    .catch((err) => next(err));
};

/*
@Route      >    METHOD /users/:userId
@Behavioure >    Return a specific user / 
                 Edit a specific user / 
                 Delete a specific user
@Access     >    Admin || department head for listing user /
                 Admin to EDIT a new user /
                 Admin to DELETE a specific user
*/

exports.getOne = (req, res, next) => {
  User.findById(req.params.userId)
    .populate({
      path: "department depHead",
      populate: {
        path: "depHead",
        select: "name avaliable _id",
      },
    })
    .then((user) => {
      if (user != null) {
        if (req.user.isAdmin == true) {
          res.status(200);
          res.setHeader("content-type", "application/json");
          res.json(user);
        } else if (
          user.department != null &&
          req.user._id == user.department.depHead._id
        ) {
          res.status(200);
          res.setHeader("content-type", "application/json");
          res.json(user);
        } else if (req.user._id == user._id) {
          res.status(200);
          res.setHeader("content-type", "application/json");
          res.json(user);
        } else {
          res.status(401);
          res.setHeader("content-type", "application/json");
          res.json({
            message: "You are not authorized to see this user's info",
          });
        }
      } else {
        err = new Error("user doesn't exists");
        err.statusCode = 404;
        return next(err);
      }
    })
    .catch((err) => next(err));
};

// assign user to a department

exports.assignUsertoDepartment = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user != null) {
        user.department = req.body.department;
        Department.findById(req.body.department).then((department) => {
          if (department != null) {
            user
              .save()
              .then((user) => {
                res.status(200);
                res.setHeader("content-type", "application/json");
                res.json({
                  message: "assigned user to department successfully",
                  user,
                });
              })
              .catch((err) => next(err));
          } else {
            res.status(404);
            res.setHeader("content-type", "application/json");
            res.json({
              message: "Department doesn't exist",
            });
          }
        });
      } else {
        err = new Error("User doesn't exists");
        err.statusCode = 404;
        return next(err);
      }
    })
    .catch((err) => next(err));
};

exports.editOne = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (req.body.name && req.user.isAdmin == true) {
        user.name = req.body.name;
      }
      if (req.body.age) {
        user.age = req.body.age;
      }
      if (req.body.emaill && req.user.isAdmin == true) {
        user.emaill = req.body.emaill;
      }
      if (req.body.position && req.user.isAdmin == true) {
        user.position = req.body.position;
      }
      if (req.body.gender) {
        user.gender = req.body.gender;
      }
      if (req.body.department && req.user.isAdmin == true) {
        user.department = req.body.department;
      }
      if (req.body.isAdmin && req.user.isAdmin == true) {
        user.isAdmin = req.body.isAdmin;
      }
      user
        .save()
        .then((user) => {
          res.status(200);
          res.setHeader("Content-Type", "application/json");
          res.json({ message: "user has been edited successfully", user });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.deleteOne = (req, res, next) => {
  User.findByIdAndRemove(req.params.userId)
    .then((user) => {
      if (user != null) {
        res.status(200);
        res.setHeader("content-type", "application/json");
        res.json({ message: "Deleted successfully" });
      } else {
        err = new Error("user doesn't exists");
        err.statusCode = 404;
        return next(err);
      }
    })
    .catch((err) => next(err));
};

exports.listAllDepartmentsHead = (req, res, next) => {
  User.find({ headOfDepartmentId: { $gte: 0 } })
    .then((users) => {
      if (users != null) {
        res.status(200);
        res.setHeader("content-type", "application/json");
        res.json({ message: `There are ${users.length} Heads`, users });
      } else {
        res.status(200);
        res.setHeader("Content-Type", "application/json");
        res.json({ message: "No heads yet!" });
      }
    })
    .catch((err) => next(err));
};
