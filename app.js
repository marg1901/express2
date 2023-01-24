const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.APP_PORT ?? 5000;
const userMaster = require("./userMaster");
const validateUser = require("./validateUser.js");

app.get("/api/users", userMaster.getUsers);
app.get("/api/users/:id", userMaster.getUsersById);
app.post("/api/users", userMaster.postUsers);
app.put("/api/users/:id,", userMaster.putUsers);
app.delete("/api/users/:id", userMaster.deleteUsers);

// Express4 BIS
app.post("/api/users", validateUser.validateUser);
app.put("/api/users/:id,", validateUser.validateUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
