var faker = require("faker");
var mongoose = require("mongoose");

function genUsers(depIDS, userIds) {
  var users = [];

  for (var i = 0; i < userIds.length; i++) {
    var random = Math.floor(Math.random() * depIDS.length);
    // hash of string ("password")
    data = {
      hash:
        "d81f6482b4aafa48da4c71985ca43d1d3cbacda4f6551b36e28c828bec1459ab6654186c94ae35b87a07174a14803b05e55f47b58d55654a557d21be76c48fe7407df1fc56acfeb773a027abc32f70ef6c641a80e88f7039af10b9a1df984d55f27bee85d2786ea3c3ed294982d777f72d89e1352191415b4475a989476ecd13e3180a1b4844680b5d14f774d2bba21669701137049d44a252e8b9f7358234f6e11ec67268b10b2345576d6c8df6f31ace4ff2a388b21accc05eb2aa3b7d4fded9dc1813f43d2c8290a38995ccdcf87d48b8a386734d92c4d2eccdf106031412835e9d0fd6d34192eea1ee20b9b902d92b04f9e663c2a22dbfb7781a2bfc221b368acac126a0f38dcc91f49b991e523bc5d2d24a33290f45a4a133057f78ecd8ae54fb118f72996930a20cca0f804ccd4ec6b269c3776c126702b6d28ba7500016c00489e48d5ca928996ebe4ffefcd5a8cdc333f513a536a4e697b13bcf344705852785bfedd263e92ff602714add50978a793e4d8ab9bbaa8dd5cc354ce706311b57bcda1142d19d04b3f05c22bd2c1a9449f2ecbbf69b566aba66fba953b37f94f97ec8731eeccda0491dac72e5a05f7e81e9253324355a8fdea1b15cb97fd0c6e17677a51878af39ef5b2855683705f78dbef2f34a27e9cffcfdcccec50f4cf4ca25e57137b941ea72900cc9987cc908be29e86cf96b49293d9e3d775e07",
      salt: "90043152a46bad4234154e0e5d7a0509bc0c575413d4f11e00339e49e1a56afa",
    };
    var user = {
      _id: userIds[i],
      department: depIDS[random],
      name: faker.name.findName(),
      avaliable: false,
      imageURL: faker.image.avatar(),
      absenceDays: 0,
      email: faker.internet.email(),
      age: faker.random.number({ min: 19, max: 60 }),
      gender: faker.random.number({ min: 1, max: 3 }),
      hash: data.hash,
      salt: data.salt,
      position: faker.name.jobTitle(),
    };
    users.push(user);
  }
  return users;
}

module.exports = {
  genUsers,
};
