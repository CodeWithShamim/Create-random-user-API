const fs = require("fs");

// read file---------------------------------------------------------------------
let users = [];
fs.readFile("utils/users.json", (err, data) => {
  if (err) res.send("Failed to read data");
  else users = JSON.parse(data.toString());
});

// handle update user-------------------------------------------------------------
const handleUpdateUser = (bulkUpdate, findUser, filterUser, data, id, res) => {
  const { gender, name, contact, address, photoUrl } = data;
  if (findUser && data) {
    const newUser = [
      ...filterUser,
      {
        ...findUser,
        gender: gender ? gender : findUser.gender,
        name: name ? name : findUser.name,
        contact: contact ? contact : findUser.contact,
        address: address ? address : findUser.address,
        photoUrl: photoUrl ? photoUrl : findUser.photoUrl,
      },
    ];

    if (bulkUpdate) {
      fs.writeFileSync("utils/users.json", JSON.stringify(newUser));
    } else {
      fs.writeFile("utils/users.json", JSON.stringify(newUser), (err) => {
        if (err) res.send("Failed to write data");
        else {
          fs.readFile("utils/users.json", (err, data) => {
            err ? res.send("Faild to read data") : res.send(data.toString());
          });
        }
      });
    }
  } else res.send(`${id} id is not find or data not find`);
};

//============================ get random user========================
module.exports.getRandomUser = (req, res) => {
  const randomNumber = Math.floor(Math.random() * users.length);
  const newUser = users[randomNumber];
  res.send(newUser);
};

// ==============================get all users============================
module.exports.getAllUsers = (req, res) => {
  const limitNumber = req.query.s;
  limitNumber ? res.send(users.slice(0, limitNumber)) : res.send(users);
};

//==========================save|post a new user==========================
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

// ==========================update a user==============================
module.exports.updateAUser = (req, res) => {
  const data = req.body;
  const id = req.params.id;

  if (isNaN(id)) res.send("Please provide a number id");
  else {
    const bulkUpdate = false;
    const findUser = users.find((user) => user.id === Number(id));
    const filterUser = users.filter((user) => user.id !== Number(id));
    handleUpdateUser(bulkUpdate, findUser, filterUser, data, id, res);
  }
};

// =============================bulk update multiple user==================================
module.exports.bulkUpdateUser = (req, res) => {
  const data = req.body;
  const { ids } = data;

  if (data && ids) {
    for (i = 0; i < ids?.length; i++) {
      const bulkUpdate = true;
      const findUser = users.find((user) => user.id === Number(ids[i]));
      const filterUser = users.filter((user) => user.id !== Number(ids[i]));
      handleUpdateUser(bulkUpdate, findUser, filterUser, data, ids[i], res);
    }
    fs.readFile("utils/users.json", (err, data) => {
      err ? res.send("Faild to read data") : res.send(data.toString());
    });
  }
};

// ==================================delete a user================================
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
            err ? res.send("Faild to read data") : res.send(data.toString());
          });
        }
      });
    } else res.send(`${id} id is not find`);
  }
};
