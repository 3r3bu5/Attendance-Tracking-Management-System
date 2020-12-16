var express = require("express");
var router = express.Router();

// import Request & User model
const Request = require("./request.model");
const User = require("../user/user.model");

// import middlewares
const authenticate = require("../middlewares/auth");
const passport = require("passport");

// import controllers
controller = require("./request.controllers");

router.get("/", authenticate.verifyUser, controller.getAll);

router.post("/", authenticate.verifyUser, controller.createOne);

router.put(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  controller.methodNotallowed
);
router.delete(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  controller.deleteAll
);

router.get("/:reqId", authenticate.verifyUser, controller.getOne);

router.put("/:reqId", authenticate.verifyUser, controller.editOne);

router.delete("/:reqId", authenticate.verifyUser, controller.deleteOne);

router.post(
  "/:reqId/accept",
  authenticate.verifyUser,
  controller.acceptRequest
);

router.post(
  "/:reqId/refuse",
  authenticate.verifyUser,
  controller.refuseRequest
);

module.exports = router;
