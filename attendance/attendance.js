var express = require("express");
var router = express.Router();

// import middlewares
const authenticate = require("../middlewares/auth");

// import controller
const controller = require("./attendance.controllers");

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
  controller.methodNotallowed
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

router.get(
  "/:attId",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  controller.getOne
);

router.post(
  "/:attId",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  controller.methodNotallowed
);
router.put(
  "/:attId",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  controller.methodNotallowed
);
router.delete(
  "/:attId",
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  controller.deleteOne
);

module.exports = router;
