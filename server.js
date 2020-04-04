const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
})