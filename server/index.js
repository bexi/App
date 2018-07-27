const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const router = require('./router');
// App setup
// middleware, all incoming requests are going through these
app.use(morgan('combined')); // logging framework
app.use(bodyParser.json({type: '*/*'})); // parse incoming requests
router(app);

// Server setup
// if there is an env variable: use that
// otherwise use port 3090
const port = process.env.PORT || 3090;
// http is native node lib
// forward all http requests to app
const server = http.createServer(app);
server.listen(port);
console.log('Server is listening on: ' + port);
