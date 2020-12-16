const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/auth");

// controllers
const uploadCtrl = require("./router.controllers");

router
  .route("/")
  .get(authenticate.verifyUser, uploadCtrl.methodNotallowed)
  .post(
    authenticate.verifyUser,
    uploadCtrl.uploadSingleMidd,
    uploadCtrl.uploadSingle
  )
  .put(authenticate.verifyUser, uploadCtrl.methodNotallowed)
  .delete(authenticate.verifyUser, uploadCtrl.methodNotallowed);

module.exports = router;
