const express = require('express');
const path = require('path');
const schemaController = require('./controllers/schemaController.js');
const queryController = require('./controllers/queryController.js');
const userController = require('./controllers/userController.js')
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('../client/public'));

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// User registration
app.post('/api/register', userController.encrypt, userController.register, (req, res) => {
  res.status(200).json('Registered user');
});

// User login
app.post('/api/login', userController.login, (req, res) => {
  res.status(200).json('Logged in');
});

// Gets the schema as a JSON file by fetching from the client-provided graphQL endpoint
app.post('/api/getschema', schemaController.introspect, schemaController.convertSchema, (req, res, next) => {
  res.status(200).json(res.locals);
});

// Gets the schema as a JSON file by fetching from the client-provided graphQL endpoint
app.post('/api/getquery', queryController.getQuery, (req, res, next) => {
  res.status(200).json(res.locals.d3querydata);
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'Express error handler caught unknown middleware error' },
  };
  const errorObj = { ...defaultErr, ...err };
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on PORT ${PORT}`);
});
