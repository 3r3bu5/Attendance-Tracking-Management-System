var express = require("express");
var router = express.Router();

// import Department model
const Department = require("../department/department.model");
const User = require("../user/user.model");

// import middlewares
const authenticate = require("../middlewares/auth");
const cors = require("../middlewares/cors");
// import controller
const controller = require("./department.controllers");

// import validation
const departmentValidation = require("./department.validation");

router
  .route("/")

  .options(cors.corsWithOptions, (req, res) => {
    res.status(200);
  })
  .get(
    cors.cors,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    controller.getAll
  )
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    departmentValidation,
    controller.createOne
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    controller.methodNotallowed
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    controller.deleteAll
  );

router
  .route("/:depId")

  .options(cors.corsWithOptions, (req, res) => {
    res.status(200);
  })
  .get(cors.cors, authenticate.verifyUser, controller.getOne)

  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    controller.methodNotallowed
  )
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    departmentValidation,
    controller.editOne
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    controller.deleteOne
  );

router
  .route("/:depId/assign")
  .options(cors.corsWithOptions, (req, res) => {
    res.status(200);
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    departmentValidation,
    controller.assignHeadOfDepartment
  );

module.exports = router;
