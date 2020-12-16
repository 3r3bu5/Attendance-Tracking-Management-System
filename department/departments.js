var express = require("express");
var router = express.Router();

// import Department model
const Department = require("../department/department.model");
const User = require("../user/user.model");

// import middlewares
const authenticate = require("../middlewares/auth");
const passport = require("passport");

// import controller
const controller = require("./department.controllers");

router.get(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  controller.getAll
);

router.post(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  controller.createOne
);
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

router.get("/:depId", authenticate.verifyUser, controller.getOne);

router.post(
  "/:depId",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  controller.methodNotallowed
);
router.put(
  "/:depId",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  controller.editOne
);
router.delete(
  "/:depId",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  controller.deleteOne
);

router.post(
  "/:depId/assign",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  controller.assignHeadOfDepartment
);

module.exports = router;
