const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
// App setup

// Server setup
// if there is an env variable: use that
// otherwise use port 3090
const port = process.env.PORT || 3090;
// http is native node lib
// forward all http requests to app
const server = http.createServer(app);
server.listen(port);
console.log('Server is listening on: ' + port);
