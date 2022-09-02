const express = require('express');
const app = express();
const cors = require("cors");
const userRoutes = require('./routes/v1/users.route.js');
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);

app.all("*", (req, res) => {
    res.send("Not found");
});

app.listen(port, () => {
    console.log("Server is running on", port);
});