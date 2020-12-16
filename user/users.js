var express = require("express");
var router = express.Router();

// import controllers
const controller = require("./user.controllers");
const passport = require("passport");
const authenticate = require("../middlewares/auth");

router.get(
  "/",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  controller.getAll
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

router.post(
  "/register",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  controller.registerNewUser
);

router.post("/login", passport.authenticate("local"), controller.loginUser);

router.post("/init", controller.createDefaultAdmin);

router.get("/avaliable", authenticate.verifyUser, controller.avaliableUsers);

router.post("/enter", authenticate.verifyUser, controller.userCheckIn);

router.post("/leave", authenticate.verifyUser, controller.userCheckOut);

router.get("/:userId", authenticate.verifyUser, controller.getOne);

router.post(
  "/:userId/assign",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  controller.assignUsertoDepartment
);

router.put("/:userId", authenticate.verifyUser, controller.editOne);
router.delete(
  "/:userId",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  controller.deleteOne
);

module.exports = router;
