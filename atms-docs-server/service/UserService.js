"use strict";

/**
 * Assign user to a department.
 * * Assign user to a department. * Access: This operation can only performed by Admin
 *
 * body Object department is the id of the department to be assigned to. (optional)
 * userId String
 * origin String CORS
 * returns Object
 **/
exports.assignUserToADepartment = function (body, userId, origin) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * CheckIn endpoint.
 * * Users can use this endpoint to checkin daily. * Access: Any registered user can perform this operation
 *
 * origin String CORS
 * returns Object
 **/
exports.checkInUser = function (origin) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Checkout endpoint
 * * Users can use this endpoint to checkou at the end of the day. * Access: Any registered user can perform this operation
 *
 * origin String CORS
 * returns Object
 **/
exports.checkOutUser = function (origin) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Create default admin endpoint.
 * * This endpoint is simply to register a new admin user if there is no admin to the system * The admin default information can be found and edited in the config.js file
 *
 * userId String
 * origin String CORS
 * returns Object
 **/
exports.createDefaultAdmin = function (userId, origin) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * [DANGER] Delete all users
 * * DELETE all users information * Access: This operation can only performed by Admin
 *
 * origin String CORS
 * returns Object
 **/
exports.deleteUsers = function (origin) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Delete a specific user info
 * Delete a specific user info. Access: This operation can only performed by Admin.
 *
 * userId String
 * origin String CORS
 * returns Object
 **/
exports.deleteUsersUserId = function (userId, origin) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * List All users information.
 * * Retrive all users information * Access: This operation can only performed by Admins users
 *
 * origin String CORS
 * no response value expected for this operation
 **/
exports.getAllUsers = function (origin) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
};

/**
 * Get the current avaliable users.
 * * List all currently avaliable employees * List all currently avaliable employees in a specific department   * Access:   * For admins: to list all the avaliable employees   * For head of the department: to list all the avaliable employees of this department
 *
 * origin String CORS
 * returns Object
 **/
exports.getAvaliableUsers = function (origin) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Retrive a specific user info
 * * Retrive a specific user info  * Access: This operation can only performed by Admin
 *
 * userId String
 * origin String CORS
 * returns Object
 **/
exports.getUsersUserId = function (userId, origin) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * List all departments heads
 * * list the head of every department. * Access: Only admin can perform this operation.
 *
 * origin String CORS (optional)
 * returns Object
 **/
exports.listAllDepartmentsHeads = function (origin) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Login endpoint.
 * * Login endpoint. * Access: This operation can only performed by Admin
 *
 * body Object  (optional)
 * userId String
 * origin String CORS
 * returns Object
 **/
exports.loginUser = function (body, userId, origin) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Register a new user.
 * * Register an employee. * Access: This operation can only performed by Admin
 *
 * body Object Request body will contain all the new user's information. (optional)
 * userId String
 * origin String CORS
 * returns Object
 **/
exports.postUsersUserIdRegister = function (body, userId, origin) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};

/**
 * Edit  a specific user info
 * * Edit a specific user info  * Access: This operation can only performed by:   * Admin => can change any of the user's information.   * user itself => can only change his image,age,gender
 *
 * body Object  (optional)
 * userId String
 * origin String CORS
 * returns Object
 **/
exports.putUsersUserId = function (body, userId, origin) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples["application/json"] = {};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
};
