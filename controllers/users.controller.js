const fs = require("fs");

// read file
let users = [];
fs.readFile("utils/users.json", (err, data) => {
  if (err) res.send("Failed to read data");
  else users = JSON.parse(data.toString());
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
  const { gender, name, contact, address, photoUrl } = data;
  if (gender && name && contact && address && photoUrl) {
    const userId = users.length + 1;
    const newUser = [...users, { id: userId, ...data }];

    //   write data
    fs.writeFile("utils/users.json", JSON.stringify(newUser), (err) => {
      if (err) res.send("Failed to write data");
      else {
        fs.readFile("utils/users.json", (err, data) => {
          err ? res.send("Faild to read data") : res.send(data);
        });
      }
    });
  } else res.send("Missing some data, try again");
};

// delete a user
module.exports.deleteAUser = (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) res.send("Please provide a number id");
  else {
    const checkId = users.find((user) => user.id === Number(id));

    if (checkId) {
      const filterUser = users.filter((user) => user.id !== Number(id));
      fs.writeFile("utils/users.json", JSON.stringify(filterUser), (err) => {
        if (err) res.send("Failed to write data");
        else {
          fs.readFile("utils/users.json", (err, data) => {
            err ? res.send("Faild to read data") : res.send(data);
          });
        }
      });
    } else res.send(`${id} id is not find`);
  }
};
