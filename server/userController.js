const userController = {};
const bcrypt = require('bcrypt');

const db = require('./models');

userController.register = (req, res, next) => {
  const { username, email } = req.body;
  const { encryptedPW } = res.locals;
  const query = `INSERT INTO users (username, password, email)
                        VALUES ($1, $2, $3)`;
  const params = [username, encryptedPW, email];
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
  // use bcrypt to hash, then store on res.locals 
  bcrypt.hash(password, 10)
    .then((hash) => {
      res.locals.encryptedPW = hash;
      return next();
    })
    .catch(() => next({
      log: 'Incorrect input format',
      status: 400,
      message: { err: 'Incorrect input format' },
    }));
};

userController.login = (req, res, next) => {
  const { username, password } = req.body;

  const str = `SELECT * FROM users
                 WHERE username = $1`;
  const params = [username];

  db.query(str, params)
    .then((data) => {
      // If user exists, authenticate the user
      if (data.rows !== []) {
        bcrypt.compare(password, data.rows[0].password)
          .then((correct) => {
          // If password correct, move to next middleware
            if (correct) return next();
            // else, handle error
            return next({
              log: 'Username or password incorrect',
              status: 400,
              message: { err: 'Username or password incorrect' },
            });
          });
      }
      // else, handle error
      return next({
        log: 'Username or password incorrect',
        status: 400,
        message: { err: 'Username or password incorrect' },
      });
    })
  // Internal server error
    .catch(() => next({
      log: 'A problem occured logging in user',
      status: 500,
      message: { err: 'A problem occured logging in user' }
    }));
};

module.exports = userController;