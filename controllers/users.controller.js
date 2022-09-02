const fs = require("fs");

// get random user
module.exports.getRandomUser = (req, res, next) => {
  fs.readFile("utils/users.json", (error, data) => {
    if (error) {
      res.send("Failed to read data");
    } else {
      //   const random = Math.floor(Math.random() * data?.length);
      console.log(data);
      res.send(data);
    }
  });
};

// get all users
module.exports.getAllUsers = (req, res, next) => {
  fs.readFile("utils/users.json", (error, data) => {
    if (error) {
      res.send("Failed to read data");
    } else {
      res.send(data);
    }
  });
};
