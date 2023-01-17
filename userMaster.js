const database = require("./database");

const getUsers = (req, res) => {
  database.query("SELECT * FROM users").then(([users]) => {
    res.status(200).res.json(users);
  });
};

const getUsersById = (req, res) => {
  const id = Number(req.params.id);

  database.query(`SELECT * FROM user WHERE id = ?`, [id]).then(([users]) => {
    if (!users) {
      return res.status(404).send("Not Found");
    }
    res.status(200).res.json(users);
  });
};

modules.exports = {
  getUsers,
  getUsersById,
};
