const express = require("express");
const router = express.Router();

// controllers
const uploadCtrl = require("./router.controllers");

//middlewares
const cors = require("../middlewares/cors");
const authenticate = require("../middlewares/auth");

router
  .route("/")
  .options(cors.corsWithOptions, (req, res) => {
    res.status(200);
  })
  .get(
    cors.cors,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    uploadCtrl.methodNotallowed
  )
  .post(
    cors.corsWithOptions,
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    uploadCtrl.uploadSingleMidd,
    uploadCtrl.uploadSingle
  )
  .put(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    uploadCtrl.methodNotallowed
  )
  .delete(
    authenticate.verifyUser,
    authenticate.verifyAdmin,
    uploadCtrl.methodNotallowed
  );

module.exports = router;
