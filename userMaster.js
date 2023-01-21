const database = require("./database");

const getUsers = (req, res) => {
  database.query("SELECT * FROM users").then(([users]) => {
    res.status(200).json(users);
  });
};

const getUsersById = (req, res) => {
  const id = Number(req.params.id);

  database.query(`SELECT * FROM users WHERE id = ?`, [id]).then(([users]) => {
    if (!users) {
      return res.status(404).send("Not Found");
    }
    res.status(200).json(users[0]);
  });

  const postUser = (req, res) => {
    const { firstname, lastname, email, city, language } = req.body;
  };

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};

module.exports = {
  getUsers,
  getUsersById,
};
