const Joi = require("joi");

function requestValidation(req, res, next) {
  var schema;

  // Schema for posting new leaving request endpoint
  // nameOfController : createOne

  if (req.method === "POST") {
    schema = Joi.object({
      reason: Joi.string().min(10).max(600).required(),
    });
  }

  // Schema for edit a request endpoint
  // nameOfController : editOne
  else if (req.method === "PUT" && req.params.reqId) {
    schema = Joi.object({
      reason: Joi.string().min(10).max(600).required(),
    });
  }

  // Schema for editing the department information endpoint
  // nameOfController : editOne

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  // validate request body against schema
  const { error, value } = schema.validate(req.body, options);

  if (error) {
    // on fail return comma separated errors
    return next(error);
  } else {
    req.body = value;
    next();
  }
}

module.exports = requestValidation;
