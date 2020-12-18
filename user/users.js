var express = require("express");
var router = express.Router();

// import controllers
const controller = require("./user.controllers");
const passport = require("passport");
// import middlewares
const authenticate = require("../middlewares/auth");
const cors = require("../middlewares/cors");

// import validation
const userValidation = require("./user.validation");

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
  .route("/register")
  .options(cors.corsWithOptions, (req, res) => {
    res.status(200);
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    userValidation,
    controller.registerNewUser
  );

router
  .route("/login")
  .options(cors.corsWithOptions, (req, res) => {
    res.status(200);
  })
  .post(
    cors.corsWithOptions,
    userValidation,
    passport.authenticate("local"),
    controller.loginUser
  );

router
  .route("/init")
  .options(cors.corsWithOptions, (req, res) => {
    res.status(200);
  })
  .post(cors.corsWithOptions, controller.createDefaultAdmin);

router
  .route("/avaliable")
  .options(cors.corsWithOptions, (req, res) => {
    res.status(200);
  })
  .get(cors.cors, authenticate.verifyUser, controller.avaliableUsers);

router
  .route("/enter")
  .options(cors.corsWithOptions, (req, res) => {
    res.status(200);
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, controller.userCheckIn);

router
  .route("/leave")
  .options(cors.corsWithOptions, (req, res) => {
    res.status(200);
  })
  .post(cors.corsWithOptions, authenticate.verifyUser, controller.userCheckOut);

router
  .route("/head")
  .options(cors.corsWithOptions, (req, res) => {
    res.status(200);
  })
  .get(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    controller.listAllDepartmentsHead
  );

router
  .route("/:userId/assign")
  .options(cors.corsWithOptions, (req, res) => {
    res.status(200);
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    userValidation,
    controller.assignUsertoDepartment
  );

router
  .route("/:userId")
  .options(cors.corsWithOptions, (req, res) => {
    res.status(200);
  })
  .get(cors.cors, authenticate.verifyUser, controller.getOne)
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    userValidation,
    controller.editOne
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    controller.deleteOne
  );

module.exports = router;
