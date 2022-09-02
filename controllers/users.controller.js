const fs = require("fs");

// read file
let users = [];
fs.readFile("utils/users.json", (err, data) => {
  if (err) {
    res.send("Failed to read data");
  } else {
    users = JSON.parse(data.toString());
  }
});

// get random user
module.exports.getRandomUser = (req, res) => {
  const randomNumber = Math.floor(Math.random() * users.length);
  const newUser = users[randomNumber];
  res.send(newUser);
};

// get all users
module.exports.getAllUsers = (req, res) => {
  const limitNumber = req.query.s;
  limitNumber ? res.send(users.slice(0, limitNumber)) : res.send(users);
};

//save|post a new user
module.exports.saveAUser = (req, res) => {
  const data = req.body;
  const userId = users.length + 1;
  const newUser = [...users, { id: userId, ...data }];
  //   write data
  fs.writeFile("utils/users.json", JSON.stringify(newUser), (err) => {
    if (err) {
      res.send("Failed to write data");
    } else {
      res.send(users);
    }
  });
};
