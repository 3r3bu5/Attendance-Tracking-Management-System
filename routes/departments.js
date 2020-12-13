var express = require("express");
var router = express.Router();

// import Department model
const Department = require("../models/departmentModel");

/*
@Route      >    METHOD /departments
@Behavioure >    Return all departments / 
                 POST a new department / 
                 Delete all departments
@Access     >    Admin for listing departments /
                 Admin to POST a new department /
                 Admin to DELETE all departments
*/

router.get("/", (req, res, next) => {
  Department.find()
    .populate("depHead", "_id name email avaliable")
    .then((departments) => {
      res.status(200);
      res.setHeader("content-type", "application/json");
      res.json(departments);
    })
    .catch((err) => next(err));
});

router.post("/", (req, res, next) => {
  Department.create(req.body)
    .then((departments) => {
      res.status(200);
      res.setHeader("content-type", "application/json");
      res.json({ message: "Department created successfully ", departments });
    })
    .catch((err) => next(err));
});
router.put("/", (req, res, next) => {
  res.status(405);
  res.setHeader("content-type", "application/json");
  res.json({ message: "METHOD is not allowed" });
});
router.delete("/", (req, res, next) => {
  Department.deleteMany({})
    .then((department) => {
      res.setHeader("content-type", "application/json");
      res.json({ message: "All Department have been deleted successfully " });
    })
    .catch((err) => next(err));
});

/*
@Route      >    METHOD /departments/:depId
@Behavioure >    Return a specific department / 
                 Edit a specific department / 
                 Delete a specific department
@Access     >    Admin for listing department /
                 Admin to EDIT a new department /
                 Admin to DELETE a specific departments
*/

router.get("/:depId", (req, res, next) => {
  Department.findById(req.params.depId)
    .populate("depHead", "_id name email avaliable")
    .then((department) => {
      if (department != null) {
        res.status(200);
        res.setHeader("content-type", "application/json");
        res.json(department);
      } else {
        err = new Error("Department doesn't exists");
        err.statusCode = 404;
        return next(err);
      }
    })
    .catch((err) => next(err));
});

router.post("/:depId", (req, res, next) => {
  res.status(405);
  res.setHeader("content-type", "application/json");
  res.json({ message: "METHOD is not allowed" });
});
router.put("/:depId", (req, res, next) => {
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
});
router.delete("/:depId", (req, res, next) => {
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
});

module.exports = router;
