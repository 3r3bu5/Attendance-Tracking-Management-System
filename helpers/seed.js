// department seed first then seed employees
var mongoose = require("mongoose");
const depSeed = require("../department/department.seed");
const userSeed = require("../user/user.seed");
var config = require("../config");
const User = require("../user/user.model");
const Request = require("../request/request.model");
const Attendance = require("../attendance/attendance.model");
const Department = require("../department/department.model");
const { v4: uuidv4 } = require("uuid");

const NumberOfDepartment = config.numberOfDummyDepartment;
const NumberOfUsers = config.numberOfDummyUsers;

function getuuids(x) {
  idsArry = [];
  for (var i = 0; i < x; i++) {
    idsArry.push(uuidv4());
  }
  return idsArry;
}

depIDs = getuuids(NumberOfDepartment);
deps = depSeed.genDepartments(depIDs);
usersIDs = getuuids(NumberOfUsers);
users = userSeed.genUsers(depIDs, usersIDs);

// to set the head of each department
function headOfDep(deps, users) {
  for (var i = 0; i < deps.length; i++) {
    var random = Math.floor(Math.random() * users.length);
    deps[i].depHead = users[random]._id;
    users[random].headOfDepartmentId = deps[i]._id;
    users[random].department = deps[i]._id;
  }
  data = {
    users,
    deps,
  };
  return data;
}

mongoose
  .connect(config.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to DB successfully"));
mongoose.set("useCreateIndex", true);

var seed = headOfDep(deps, users);

// Reset collections
Department.deleteMany({ name: { $ne: "Admins" } }) //  not drop the admins department
  .exec()
  .then(function () {
    User.deleteMany({ isAdmin: false })
      .exec() //  not drop the admins users
      .then(() => {
        Attendance.deleteMany({}).then(() => {
          return Request.deleteMany({});
        });
      });
  })
  // Seed
  .then(function () {
    Department.insertMany(seed.deps)
      .then((deps) => {
        User.insertMany(seed.users)
          .then((users) => {
            console.log("Seeded successfully");
            mongoose
              .disconnect()
              .then(() => {
                console.log("Disconnect successfully, Have fun");
              })
              .catch((err) => {
                console.log("There was an error while disconnect from the DB!");
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => console.log(err));
  });
