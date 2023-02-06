const { body, validationResult } = require("express-validator");

const validators = [];

validators.push(body("firstname").isLength({ min: 3, max: 255 }).isString());
validators.push(body("lastname").isLength({ min: 3, max: 255 }).isString());
validators.push(body("city").isLength({ min: 3, max: 255 }).isString());
validators.push(body("language").isLength({ min: 3, max: 255 }).isString());
validators.push(
  body("email", "It's not an email address !")
    .isEmail()
    .isLength({ min: 5, max: 255 })
);
validators.push(
  body("password", "The password must have at least 3 chars.")
    .isLength({ min: 3, max: 255 })
    .isString()
);

validators.push((req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ validationErrors: errors.array() });
  } else {
    next();
  }
});

const validateUser = (req, res, next) => {
  const { firstname, lastname, city, language } = req.body;
  const { email } = req.body;
  const errors = [];
  const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

  if (firstname == null) {
    errors.push({ field: "firstname", message: "This field is required" });
  }
  if (lastname == null) {
    errors.push({ field: "lastname", message: "This field is required" });
  }
  if (city == null) {
    errors.push({ field: "city", message: "This field is required" });
  }
  if (language == null) {
    errors.push({ field: "language", message: "This field is required" });
  }
  if (!emailRegex.test(email)) {
    errors.push({ field: "email", message: "Invalid email" });
  }
  if (errors.length) {
    res.status(422).json({ validationErrors: errors });
  } else {
    next();
  }
};

module.exports = {
  validateUser,
  validators,
};
