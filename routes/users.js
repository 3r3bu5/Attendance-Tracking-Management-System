var express = require("express");
const { now } = require("mongoose");
var router = express.Router();

// import usersModel

const User = require("../models/userModel");

/*
@Route      >    METHOD /users
@Behavioure >    Return all users / 
                 POST a new user / 
                 Delete all users
@Access     >    Admin for listing users /
                 Admin to POST a new user /
                 Admin to DELETE all users
*/

router.get("/", (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200);
      res.setHeader("content-type", "application/json");
      res.json(users);
    })
    .catch((err) => next(err));
});

router.post("/", (req, res, next) => {
  User.create(req.body)
    .then((users) => {
      res.status(200);
      res.setHeader("content-type", "application/json");
      res.json({ message: "User created successfully ", users });
    })
    .catch((err) => next(err));
});
router.put("/", (req, res, next) => {
  res.status(405);
  res.setHeader("content-type", "application/json");
  res.json({ message: "METHOD is not allowed" });
});
router.delete("/", (req, res, next) => {
  User.deleteMany({})
    .then((User) => {
      res.setHeader("content-type", "application/json");
      res.json({ message: "All users have been deleted successfully " });
    })
    .catch((err) => next(err));
});

/*
@Route      >    METHOD /users/:userId
@Behavioure >    Return a specific user / 
                 Edit a specific user / 
                 Delete a specific user
@Access     >    Admin for listing user /
                 Admin to EDIT a new user /
                 Admin to DELETE a specific user
*/

router.get("/:userId", (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user != null) {
        res.status(200);
        res.setHeader("content-type", "application/json");
        res.json(user);
      } else {
        err = new Error("user doesn't exists");
        err.statusCode = 404;
        return next(err);
      }
    })
    .catch((err) => next(err));
});

router.post("/:userId", (req, res, next) => {
  res.status(405);
  res.setHeader("content-type", "application/json");
  res.json({ message: "METHOD is not allowed" });
});
router.put("/:userId", (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (req.body.name) {
        user.name = req.body.name;
      }
      if (req.body.age) {
        user.age = req.body.age;
      }
      if (req.body.emaill) {
        user.emaill = req.body.emaill;
      }
      if (req.body.position) {
        user.position = req.body.position;
      }
      if (req.body.gender) {
        user.gender = req.body.gender;
      }
      if (req.body.department) {
        user.department = req.body.department;
      }
      if (req.body.isAdmin) {
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
});
router.delete("/:userId", (req, res, next) => {
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
});

/*
@Route      >    METHOD /users/:userId/enter  /leave
@Behavioure >    check in for a specific user / 
                 checkout for a specific user / 
                 
@Access     >    Specific user to checkin /
                 Specific user to checkout /
                 
*/

router.post("/:userId/enter", (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user != null) {
        const data = {
          entry: Date.now(), // save current time as check-in entry
          avaliable: true,
        };
        startinghour = 09; // startinghour of the day (remember to use 2 digits ex: if the starting hour is 9 use 09 NOT 9)
        allowanceminutes = 10; // minutes allowed to check in after workinghour

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
              currentHour === startinghour &&
              currentMinutes <= allowanceminutes
            ) {
              user.attendance.push(data);
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
          console.log(currentHour == startinghour);
          if (
            currentHour == startinghour &&
            currentMinutes <= allowanceminutes
          ) {
            user.attendance.push(data);
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
        err = new Error("user doesn't exists");
        err.statusCode = 404;
        return next(err);
      }
    })
    .catch((err) => next(err));
});

router.post("/:userId/leave", (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user != null) {
        workHours = 8; // number of work hours of each day
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
            console.log(empWorkedHours);

            if (empWorkedHours >= workHours) {
              // check if employee has completed the specified workhours
              lastAttendance.exit.time = Date.now();
              lastAttendance.avaliable = false;
              lastAttendance.workingHours = Math.round(empWorkedHours);
              user
                .save()
                .then((user) => {
                  res.status(200);
                  res.setHeader("content-type", "application/json");
                  res.json({ message: "DONE! You have signed out for today" });
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
        // employee doesn't exist
        err = new Error("user doesn't exists");
        err.statusCode = 404;
        return next(err);
      }
    })
    .catch((err) => next(err));
});

module.exports = router;
