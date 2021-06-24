const express = require('express');
const db = require('./db');
const morgan = require('morgan');
const router = require('./routes.js');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

app.use(express.static(__dirname + '/../client'));

app.listen(PORT, function() {
  console.log(`Server listening at http://localhost:${PORT}`);
});