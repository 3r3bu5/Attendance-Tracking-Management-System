const express = require("express");
const Department = require("./department.model");
const User = require("../user/user.model");

exports.methodNotallowed = (req, res) => {
  res.status(405);
  res.setHeader("content-type", "application/json");
  res.json({
    error: ` ${req.method} Method is not allowed on ${req.baseUrl} `,
  });
};

/*
@Route      >    METHOD /departments
@Behavioure >    Return all departments / 
                 POST a new department / 
                 Delete all departments
@Access     >    Admin for listing departments /
                 Admin to POST a new department /
                 Admin to DELETE all departments
*/

exports.getAll = (req, res, next) => {
  // only admin can list all departments
  Department.find()
    .populate("depHead", "_id name email avaliable")
    .then((departments) => {
      res.status(200);
      res.setHeader("content-type", "application/json");
      res.json(departments);
    })
    .catch((err) => next(err));
};
exports.createOne = (req, res, next) => {
  // only admin can post  a new department
  Department.create(req.body)
    .then((departments) => {
      res.status(201);
      res.setHeader("content-type", "application/json");
      res.json({ message: "Department created successfully ", departments });
    })
    .catch((err) => next(err));
};

exports.deleteAll = (req, res, next) => {
  // only admin can delete all departments
  Department.deleteMany({})
    .then((department) => {
      res.setHeader("content-type", "application/json");
      res.json({ message: "All Department have been deleted successfully " });
    })
    .catch((err) => next(err));
};

/*
@Route      >    METHOD /departments/:depId
@Behavioure >    Return a specific department / 
                 Edit a specific department / 
                 Delete a specific department
@Access     >    Admin || department head for listing department /
                 Admin to EDIT a new department /
                 Admin to DELETE a specific departments
*/

exports.getOne = (req, res, next) => {
  // admin can list all departments
  // also the department head can access only his department information
  Department.findById(req.params.depId)
    .populate("depHead", "_id name email avaliable")
    .then((department) => {
      if (department != null) {
        if (
          (department.depHead != null &&
            req.user._id == department.depHead._id) ||
          req.user.isAdmin == true
        ) {
          // check if the logged-in user is the head of this department
          res.status(200);
          res.setHeader("content-type", "application/json");
          res.json(department);
        } else {
          res.status(401);
          res.setHeader("content-type", "application/json");
          res.json({
            message: "You are not allowed to see this dep's information",
          });
        }
      } else {
        err = new Error("Department doesn't exists");
        err.statusCode = 404;
        return next(err);
      }
    })
    .catch((err) => next(err));
};

exports.editOne = (req, res, next) => {
  Department.findById(req.params.depId)
    .then((department) => {
      if (req.body.name) {
        department.name = req.body.name;
      }
      if (req.body.abbr) {
        department.abbr = req.body.abbr;
      }
      if (req.body.depHead) {
        department.depHead = req.body.depHead;
      }
      department
        .save()
        .then((department) => {
          res.status(200);
          res.setHeader("Content-Type", "application/json");
          res.json({
            message: "Department has been edited successfully",
            department,
          });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

exports.deleteOne = (req, res, next) => {
  Department.findByIdAndRemove(req.params.depId)
    .then((department) => {
      if (department != null) {
        res.status(200);
        res.setHeader("content-type", "application/json");
        res.json({ message: "Deleted successfully" });
      } else {
        err = new Error("Department doesn't exists");
        err.statusCode = 404;
        return next(err);
      }
    })
    .catch((err) => next(err));
};

// Assign Head of the department

exports.assignHeadOfDepartment = (req, res, next) => {
  Department.findById(req.params.depId)
    .then((department) => {
      if (department != null) {
        department.depHead = req.body.depHead;
        department
          .save()
          .then((department) => {
            User.findById(req.body.depHead).then((user) => {
              if (user != null) {
                user.headOfDepartmentId = req.params.depId;
                user.department = req.params.depId;
                user
                  .save()
                  .then((user) => {
                    res.status(200);
                    res.setHeader("content-type", "application/json");
                    res.json({
                      message:
                        "Department's head assigned successfully successfully",
                      department,
                    });
                  })
                  .catch((err) => next(err));
              } else {
                res.status(404);
                res.setHeader("content-type", "application/json");
                res.json({
                  message: "User doesn't exist",
                });
              }
            });
          })
          .catch((err) => next(err))

          .catch((err) => next(err));
      } else {
        err = new Error("Department doesn't exists");
        err.statusCode = 404;
        return next(err);
      }
    })
    .catch((err) => next(err));
};
