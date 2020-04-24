const userController = {};
const bcrypt = require('bcrypt');

const db = require('./models');

userController.register = (req, res, next) => {
  const { username, password } = res.locals.user;
  const query = `INSERT INTO users (username, password, email)
                        VALUES ($1, $2, $3)`;
  const params = [username, password, email];
  db.query(query, params)
    .then(() => next())
    .catch(() => next({
      log: 'Username already exists',
      status: 400,
      message: { err: 'Username already exists' },
    }));
};

// Encrypts user password
userController.encrypt = (req, res, next) => {
  const { password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      res.locals.user = { ...req.body, password: hash };
      return next();
    })
    // Internal bcrypt error
    .catch(() => next({
      log: 'Incorrect input format',
      status: 400,
      message: { err: 'Incorrect input format' },
    }));
};

userController.login = (req, res, next) => {
  const { username, password } = req.body;

};

userController.authenticate = (req, res, next) => {

};

module.exports = userController;