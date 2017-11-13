'use strict';

const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const messages = require('./routes/messages');
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PATCH,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/messages', messages);
//

const path = require('path');

app.use(express.static(path.join('public')));

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
