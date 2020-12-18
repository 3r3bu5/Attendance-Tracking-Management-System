## To do

- Departments
  - [x] Route
  - [x] Model
  - [x] Controllers
- Users
  - [x] Route
  - [x] Model
  - [x] Controllers
- Requests

  - [x] Route
  - [x] Model
  - [x] Controllers

- Auth

  - [x] Local logIn/Register
  - [x] Implement authorization and access control

- Requirment based changes

  - [x] Add the (avaliable users at the moment) endpoint
        Admins: to list all the avaliable employees,
        Head of the department: to list all the avaliable employees of this department
  - [x] Final attendance log and count the absence days of the employess

- Extras

  - [x] Seed dummy data into the db for further and better testing~~
  - [x] Add default department for admins user
  - ~~[ ] Add default department for users who are not assigned to any~~. (decided to remove it since you cant add users who can't be assigned to any department I think!)
  - [x] Add Endpoint to list all users who are heads of departments
  - [x] Add restrictions for leaving requests
  - [x] Design validation for all endpoints
  - [ ] Add tests for the endpoints
  - [x] Add upload router to handle user's images
  - [x] Seprate every endpoint to controller
  - [x] Extract all changeable configuration (statringWorkHour, Minutesdelayallowence,..) from code to the config file
  - [x] CORS
  - [x] Add HelmetJs to provide basic security headers
  - [x] Use HTTPS over HTTP
  - [x] Publish the 1.1 v1 of the API on Swagger

- View based requirments (Maybe I will do it maybe not)
  - [ ] Notification subsystem to the leaving requests
  - [ ] Track availability during the day
