const fs = require("fs");

// get random user
module.exports.getRandomUser = (req, res, next) => {
  fs.readFile("utils/users.json", (error, data) => {
    if (error) {
      res.send("Failed to read data");
    } else {
      const newData = JSON.parse(data.toString());
      const randomNumber = Math.floor(Math.random() * newData.length);
      const user = newData[randomNumber];
      res.send(user);
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
