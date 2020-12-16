var express = require("express");
var router = express.Router();

// import controllers
const controller = require("./user.controllers");
const passport = require("passport");
// import middlewares
const authenticate = require("../middlewares/auth");
const cors = require("../middlewares/cors");

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
    controller.registerNewUser
  );

router
  .route("/login")
  .options(cors.corsWithOptions, (req, res) => {
    res.status(200);
  })
  .post(
    cors.corsWithOptions,
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
  .post("/avaliable")
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
  .post(
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
    controller.assignUsertoDepartment
  );

router
  .route("/:userId")
  .options(cors.corsWithOptions, (req, res) => {
    res.status(200);
  })
  .get(cors.cors, authenticate.verifyUser, controller.getOne);
router.put(cors.corsWithOptions, authenticate.verifyUser, controller.editOne);
router.delete(
  cors.corsWithOptions,
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  controller.deleteOne
);

module.exports = router;
