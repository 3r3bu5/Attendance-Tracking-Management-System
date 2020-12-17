var express = require("express");
var router = express.Router();

// import middlewares
const authenticate = require("../middlewares/auth");
const passport = require("passport");

// import controllers
const controller = require("./request.controllers");
const cors = require("../middlewares/cors");

// import validation

const requestValidation = require("./request.validation");

router
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.status(200);
  })

  .get(cors.cors, authenticate.verifyUser, controller.getAll)

  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    requestValidation,
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
  .route("/:reqId")
  .options(cors.corsWithOptions, (req, res) => {
    res.status(200);
  })
  .get(cors.cors, authenticate.verifyUser, controller.getOne)
  .put(
    cors.corsWithOptions,
    authenticate.verifyUser,
    requestValidation,
    controller.editOne
  )
  .delete(cors.corsWithOptions, authenticate.verifyUser, controller.deleteOne);

router
  .route("/:reqId/accept")
  .options(cors.corsWithOptions, (req, res) => {
    res.status(200);
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    controller.acceptRequest
  );

router
  .route("/:reqId/refuse")
  .options(cors.corsWithOptions, (req, res) => {
    res.status(200);
  })
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    controller.refuseRequest
  );

module.exports = router;
