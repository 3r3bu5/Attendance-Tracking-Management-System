const Joi = require("joi");

function userValidation(req, res, next) {
  var schema;
  // Schema for register new user  endpoint
  // nameOfController : registerNewUser

  if (req.method === "POST" && req.route.path == "/register") {
    schema = Joi.object({
      name: Joi.string().min(6).max(30).required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required()
        .min(6)
        .max(255),
      age: Joi.number().required().min(16).max(70),

      gender: Joi.number().required().min(1).max(3),

      department: Joi.string().min(36).max(36).required(),
      position: Joi.string().min(5).max(30).required(),
      email: Joi.string().email().required(),
    });
  }

  // Schema for login endpoint
  // nameOfController : loginUser
  else if (req.method === "POST" && req.route.path == "/login") {
    schema = Joi.object({
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required()
        .max(255),
      email: Joi.string().email().required(),
    });
  }

  // Schema for assign User to department endpoint
  // nameOfController: assignUsertoDepartment
  else if (req.method === "POST" && req.params.userId) {
    schema = Joi.object({
      department: Joi.string().min(36).max(36).required(),
    });
  }

  // Schema for Edit user's information endpoint
  // nameOfController : editOne
  else if (req.method === "PUT" && req.params.userId) {
    schema = Joi.object({
      name: Joi.string().min(6).max(30),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))

        .min(6)
        .max(255),
      age: Joi.number()

        .min(16)
        .max(70),

      gender: Joi.number()

        .min(1)
        .max(3),

      department: Joi.string().min(36).max(36),
      position: Joi.string().min(5).max(30),
      email: Joi.string().email(),
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

module.exports = userValidation;
