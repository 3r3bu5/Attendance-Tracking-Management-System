var express = require("express");
var router = express.Router();

// import middlewares
const authenticate = require("../middlewares/auth");

// import controller
const controller = require("./attendance.controllers");
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
    controller.methodNotallowed
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    controller.deleteAll
  );

router
  .route("/:attId")
  .options(cors.corsWithOptions, (req, res) => {
    res.status(200);
  })
  .get(
    cors.cors,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    controller.getOne
  )

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
    controller.methodNotallowed
  )
  .delete(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    controller.deleteOne
  );

module.exports = router;
