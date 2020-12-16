const CronJob = require("cron").CronJob;
const User = require("../user/user.model");
const Attendance = require("./attendance.model");
const config = require("../config");

endWork = (config.startinghour + config.workHours) % 24;

console.log(`The full Attendance of the day will be at ${endWork} O'clock`);

var AttendanceCron = new CronJob(
  `5 ${endWork} * * *`,
  function () {
    userarr = [];
    User.find({})
      .then((users) => {
        users.forEach((user) => {
          data = {
            employee: user._id,
            attended: user.avaliable,
          };
          userarr.push(data);
          if (user.avaliable == false) {
            user.absenceDays += 1;
            user
              .save()
              .then((user) => {})
              .catch((err) => console.log(err));
          }
        });
        Attendance.create({
          employees: userarr,
        })
          .then(() => {
            console.log("Took the full Attendance of today! Have fun");
          })
          .catch((err) => {
            console.log({ message: "Something went wrong!", err });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  null
);

module.exports = AttendanceCron;

/*
 # * * * * * 
 # │ │ │ │ │
 # │ │ │ │ │
 # │ │ │ │ └───── day of week (0 - 6) (0 to 6 are Sunday to Saturday, or use names; 7 is Sunday, the same as 0)
 # │ │ │ └────────── month (1 - 12)
 # │ │ └─────────────── day of month (1 - 31)
 # │ └──────────────────── hour (0 - 23)
 # └───────────────────────── min (0 - 59)

*/
