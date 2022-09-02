const express = require('express');
const app = express();
const cors = require("cors");
const port = 5000;

app.use(express.json());
app.use(cors());

app.get("/api/v1/user", (req, res) => {
    res.send("get");
});

app.all("*", (req, res) => {
    res.send("Not found");
});

app.listen(port, () => {
    console.log("Server is running on", port)
});