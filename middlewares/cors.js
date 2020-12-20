var cors = require("cors");
const config = require("../config.js");

var allowedOrigins = config.origins;

var corsOptionsDelegate = (req, callback) => {
  var corsOptions;
  if (allowedOrigins.indexOf(req.header("Origin")) != -1) {
    corsOptions = { origin: true };
  } else {
    corsOptions = { origin: false };
    var msg =
      "The CORS policy for this site does not " +
      "allow access from the specified Origin.";
    return callback(new Error(msg), false);
  }

  return callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);
