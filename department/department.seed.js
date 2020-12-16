const faker = require("faker");
const mongoose = require("mongoose");
const Department = require("./department.model");
const { v4: uuidv4 } = require("uuid");

function genDepartments(arr) {
  var departments = [];

  for (var i = 0; i < arr.length; i++) {
    var department = {
      _id: arr[i],
      name: faker.commerce.department(),
      abbr: Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 3),
    };

    departments.push(department);
  }
  return departments;
}

module.exports = {
  genDepartments,
};
