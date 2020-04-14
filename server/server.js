const express = require('express');
const path = require('path');
const schemaController = require('./schemaController.js');
const queryController = require('./queryController.js');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Gets the schema as a JSON file by fetching from the client-provided graphQL endpoint
app.post('/gql/getschema', schemaController.convertSchema, (req, res, next) => {
  res.status(200).json(res.locals.d3json);
});

// Gets the schema as a JSON file by fetching from the client-provided graphQL endpoint
app.post('/gql/getquery', schemaController.convertSchema, (req, res, next) => {
  res.status(200).json(res.locals.d3json);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on PORT ${PORT}`);
});
