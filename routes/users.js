var express = require("express");
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

module.exports = router;
