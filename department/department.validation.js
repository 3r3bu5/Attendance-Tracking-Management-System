const Joi = require("joi");

function departmentValidation(req, res, next) {
  var schema;

  // Schema for assigning the headof department endpoint
  // nameOfController : assignHeadOfDepartment
  if (req.method === "POST" && req.params.depId) {
    schema = Joi.object({
      depHead: Joi.string().min(36).max(36).required(),
    });
  }

  // Schema for creating new department endpoint
  // nameOfController : createOne
  else if (req.method === "POST") {
    schema = Joi.object({
      name: Joi.string().min(6).max(30).required(),
      abbr: Joi.string().min(2).max(9).required(),
    });
  }

  // Schema for editing the department information endpoint
  // nameOfController : editOne
  else if (req.method === "PUT") {
    schema = Joi.object({
      name: Joi.string().min(6).max(30).required(),

      depHead: Joi.string()
        .min(36) // to make sure that it is a valid uuid string
        .max(36),

      abbr: Joi.string().min(2).max(9).required(),
    });
  }

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

module.exports = departmentValidation;
