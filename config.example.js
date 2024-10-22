module.exports = {
  mongoURL: "", // Database connection string          type: String
  JWTsecret: "", // JWTSecret                           type: String
  adminEmail: "", // Default admin email                 type: String
  adminAge: 0, // Default admin Age                   type: Number
  adminGender: 1, // 1- male   2- female 3- other    type: Number
  origins: ["http://localhost:3000", "https://localhost:9000"], // allowed origins that can make requests to the server   type: Array
  adminPass: "", // Default admin Password              type: String
  adminName: "", // Default admin Name                  type: String
  startinghour: 09, // startinghour of the day (remember to use 2 digits ex: if the starting hour is 9 use 09 NOT 9)   type: Number
  allowanceminutes: 10, // minutes allowed to check in after workinghour                                                type: Number
  workHours: 8, // number of work hours of each day                                                                        type: Number
};
