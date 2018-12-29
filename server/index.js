const express = require('express');
const http = require('http');
const bodyParser = require('body-parser'); // TODO: not need now since it is in express
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();
const router = require('./router');

// DB setup
mongoose.connect('mongodb://localhost:27017/auth',  { useNewUrlParser: true }); // auth is the name of the db
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected');
}.bind(console));

// App setup
// middleware, all incoming requests are going through these
app.use(morgan('combined')); // logging framework
app.use(bodyParser.json({type: '*/*'})); // parse incoming requests
router(app);

// Server setup
// if there is an env variable: use that, otherwise use port 3090
const port = process.env.PORT || 3090;
// http is native node lib, forward all http requests to app
const server = http.createServer(app);
server.listen(port);
console.log('Server is listening on: ' + port);
