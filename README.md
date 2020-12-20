# ATMS

#### What is ATMS ?

**Attendance Tracking Management System** is a REST API that is a part of an **HR System**, that allows **the Admin** to track the attendance and leaving of the employees, tracks their availability during the day, and manages their profiles.

#### Technologies Involved

- Backend: **NodeJs** and **Express framework**
- Database: **MongoDB** and **Mongoose** as an ORM
- Authentication: **Passport**, **Passport-local** and **Passport-local-mongoose**
- Endpoints Validation: **Joi**
- API Documentation: **OpenAPI V3** and **Swagger**

**To start the server**

1- First Download the repo:

```JavaScript
git clone https://github.com/3r3bu5/ATMS.git
```

2- Create a **server.cert** and **server.key** and put them in the **/bin/** folder using **openSSL** tool.

```
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```

if you don't know what is SSL and how to create one you can follow this guide: [Link](https://flaviocopes.com/express-https-self-signed-certificate/)

3- Create a **config.js** at the root directory then **copy** the content of **config.example.js**

4- Edit the content of **config.js** based on your system requirements.

5- Run the server.

```
npm start
```

6- Make a **POST** request to the **/users/init** endpoint which will **make an admin account** using the **config.js** information ex:

```
$ curl -X POST -k -H "Origin: https://localhost:9000"  https://localhost:9000/users/init
```

**Note:** The server is using **[CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)** to only allow requests from specific origins, You can **add/edit** origins by editing the **origins** in the **config.js** file.

How should your **config.js** looks:

```
module.exports = {
  mongoURL: "", // Database connection string            type: String
  JWTsecret: "", // JWTSecret                            type: String
  adminEmail: "", // Default admin email                 type: String
  adminAge: 0, // Default admin Age                      type: Number
  adminGender: 1, // 1- male   2- female 3- other        type: Number
  origins: ["http://localhost:3000", "https://localhost:9000"], // allowed origins that can make requests to the server   type: Array
  adminPass: "", // Default admin Password              type: String
  adminName: "", // Default admin Name                  type: String
  startinghour: 09, // startinghour of the day (remember to use 2 digits ex: if the starting hour is 9 use 09 NOT 9) type:Number
  allowanceminutes: 10, // minutes allowed to check in after workinghour    type: Number
  workHours: 8, // number of work hours of each day       type: Number
  numberOfDummyDepartment: 5,  // number of dummy departments to create when seeding the db   type:Number
  numberOfDummyUsers: 10,   // number of dummy users to create when seeding the db   type:Number
};
```

## Getting started with the API.

### Requirements

This project's requirements were given as a PDF document you can find **[Here](https://github.com/3r3bu5/ATMS/blob/API_Documentation/ATMS.pdf)**.

- These requirements are **poor requirements** or they are just too **abstract** that you can't relay on, So I had to imagine how the system should work and what are the main components.
- Decided to adopt the **Design first approch** so I can build a big picture of the system and how the components interact with each others.
- Also this approch should make **understanding the API much easier** for the developers who wants to contribute to it.

### Documentation

I used [Swagger.io](http://swagger.io) to document the API. You can list all the endpoints, their descriptions and how the overall system work together.

Here is a link to the API v1.1 documentation : 👉 **[ATMS Swagger Documentation](https://app.swaggerhub.com/apis-docs/3r3bu5/ATMS/1.1.0)**

There is also an **offline version** of the documentation that you can run locally, just follow the instructions in: **[ATMS docs server ](atms-docs-server/)**

#### Authentication

The API uses **jwt-tokens** to authenticate requests. You can issue tokens by sign-in using the **/users/login** endpoint.

### Features

The **API** supports features like:

- Supports **3 different types of users** ( Admins,Head of departments, and normal employees).
- **The system has an endpoint that creates default admin user to the system.**
- **Authentication system** based on JWT-tokens.
- The server is using the **uuid** over the **mongodb objectid**
- **Track the users information** and the **number of absence days for all users**.
- **Create new departments** and **assign the head of each department**.
- **Check-in & checkouts** daily for users.
- **Track the number of working hours per day** for all employees.
- ** The ability to upload users avatars**
- **Create new employees** and **assign them to departments**.
- Users can **apply for leaving requests** which will be **accepted or refused** by the **admins** or **the the head of department the user belongs to**.
- **Validation on all endpoints** to only accept accurate data.
- **The system automatically creates full attendance entry daily at the end of the working day** to track the avaliabilty of all users at each day and count the absence days of the users.
- The ability to **seed dummy data into the system** so you can test the system at a bigger scope.
- The server is using **CORS** mechanism that permits only specific origins to access restricted resources.

## Features of the ATMS API (V1.1):

- #### Authenticantion component.

  - Allow users to signin to the API.
  - Issues JWT-Tokens after signing-in.
  - Allow only admins users to register new users.

- #### Department component.

  - Create a department and assign the head of the department.
  - Edit any department's information.
  - List/Delete all the departments.

- #### User components.

  - Allow admins to list all users.
  - Allow Admins to List/Edit/Delete user's information.
  - Allow admins to list all the heads of departments.
  - Allow admins to list all avaliable users at the moment (checked-in users for today).
  - Allow the heads of departments to list all avaliable users at the moment (checked-in users for today)inside thier departments.
  - Manages his own profile and track his own leaving requests
  - Allow users to checkin at a specific time.
  - The users can check-out if he completed the work hour for the day without the admin's permission.
  - Preview the full history/edits for each ticket.

- #### Request components.
  - Users can apply for leaving request if they are checked-in for today.
  - User can't apply for new leaving request if he already applied for one earlier today.
  - The admins/the head of user's department can accept/refuse the leaving request of a user.

#### Things I learned from building this project.

- I had the chance to interact with the **JS Date object** since this project **doesn't have any date/time package** just the built-in date object in JS.
- Setup **cron job** within node Js and express to automatically create a **new mongodb document** at the end of a work day containing the **avaliabity of users during this day** and **increase the count of absence days** for the users who are absent at that day.

---

### FAQs

**1- How to seed dummy data ?**

- 1- first specifiy how many dummy departmetns **(numberOfDummyDepartment)** and dummy users **(numberOfDummyUsers)** you want to create in the **config.js** file

- 2- then run

```
npm run seed
```

- 3- You can sign-in to any account with the user's email and **password** as password

**2- Can I sign-in to using the dummy users ?**

Yes you can, just get the user email and the user's password is always **password**

---

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

- View based requirments (Maybe I will do them maybe not)
  - [ ] Notification subsystem to the leaving requests
  - [ ] Track availability during the day
