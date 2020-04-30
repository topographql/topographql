const userController = {};
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/models');

// bcrypt/JWT settings
const SECRET_KEY =
  '|pMyM2@4h=hs@|aE5mGCn.P-<KX}sJ!9[TA@>y)jy@-5p/G0(],0,#j,(JHV_q8';

userController.register = (req, res, next) => {
  const { username, email } = req.body;
  const { hashedPW } = res.locals;
  const query = `INSERT INTO users (username, password, email)
                        VALUES ($1, $2, $3)`;
  const params = [username, hashedPW, email];
  db.query(query, params)
    .then(() => next())
    .catch(() =>
      next({
        log: 'Username already exists',
        status: 400,
        message: { err: 'Username already exists' },
      }),
    );
};

// Encrypts user password
userController.encrypt = (req, res, next) => {
  const { password } = req.body;
  // use bcrypt to hash, then store on res.locals
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      res.locals.hashedPW = hash;
      return next();
    })
    .catch(() =>
      next({
        log: 'Incorrect input format',
        status: 400,
        message: { err: 'Incorrect input format' },
      }),
    );
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
        console.log(data.rows[0].password);
        bcrypt
          .compare(password, data.rows[0].password)
          .then((correct) => {
            // If password incorrect, handle error
            if (!correct) {
              return next({
                log: 'Username or password incorrect',
                status: 400,
                message: { err: 'Username or password incorrect' },
              });
            }
            res.locals.username = username;
            return next();
          })
          .catch(() =>
            next({
              log: 'Username or password incorrect',
              status: 400,
              message: { err: 'Username or password incorrect' },
            }),
          );
      }
    })
    // Internal server error
    .catch(() =>
      next({
        log: 'A problem occured logging in user',
        status: 500,
        message: { err: 'A problem occured logging in user' },
      }),
    );
};

userController.createSession = (req, res, next) => {
  const { username } = res.locals;

  jwt.sign(
    {
      username,
    },
    SECRET_KEY,
    (err, token) => {
      if (err) {
        return next({
          code: 500,
          message: 'Could not log in at this time.',
          log: `userController.createSession: failed to create JWT(${username})`,
        });
      }

      res.cookie('token', token, {
        httpOnly: true,
      });
      // return res.status(200).json('Created session');
      return next();
    },
  );
};

// validate JWT
userController.validateJWT = (req, res, next) => {
  const { token } = req.cookies;
  jwt.verify(token, SECRET_KEY, (err, usernameObj) => {
    if (err) {
      return next({
        code: 403,
        message: 'Could not verify user.',
        log: 'loginController.verifyJWT: user passed invalid JWT to server',
      });
    }
    res.locals.username = usernameObj;
    console.log(res.locals.username);
    return next();
  });
  // WARNING: outside JWT validation
};

userController.saveQuery = (req, res, next) => {
  const { user, queryName, queryStr } = req.body;
  const query = `INSERT INTO queries (username, query_name, query_str)
                    VALUES ($1, $2, $3)
                    RETURNING *;`;
  const params = [user, queryName, queryStr];
  db.query(query, params)
    .then((data) => {
      res.locals.saved = data.rows[0];
      return next();
    })
    .catch(() =>
      next({
        log: 'Query already exists or cannot be saved',
        status: 400,
        message: { err: 'Query already exists or cannot be saved' },
      }),
    );
};

userController.getHistory = (req, res, next) => {
  const { user } = req.body;
  const query = 'SELECT * FROM queries WHERE username = $1;';
  const params = [user];
  db.query(query, params)
    .then((data) => {
      res.locals.history = data.rows;
      return next();
    })
    .catch(() =>
      next({
        log: 'Query history cannot be retrieved',
        status: 400,
        message: { err: 'Query history cannot be retrieved' },
      }),
    );
};

module.exports = userController;
