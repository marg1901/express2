const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.APP_PORT ?? 5000;
const userMaster = require("./userMaster");
const validateUser = require("./validateUser.js");
const { hashPassword, verifyPassword, verifyToken } = require("./auth.js");
app.use(express.json());

// const isItDwight = (req, res) => {
//   if (
//     req.body.email === "dwight@theoffice.com" &&
//     req.body.password === "123456"
//   ) {
//     res.send("Credentials are valid");
//   } else {
//     res.sendStatus(401);
//   }
// };

// the public routes
app.get("/api/users", userMaster.getUsers);
app.get("/api/users/:id", userMaster.getUsersById);
app.post(
  "/api/login",
  userMaster.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);

app.use(verifyToken); // authentication wall : verifyToken is activated for each route after this line

app.post(
  "/api/users",
  validateUser.validators,
  hashPassword,
  userMaster.postUsers
);
app.put(
  "/api/users/:id",
  validateUser.validators,
  hashPassword,
  userMaster.putUsers
);
app.delete("/api/users/:id", userMaster.deleteUsers);

// app.put("/api/users/:id", hashPassword, userMaster.updateUsers);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
