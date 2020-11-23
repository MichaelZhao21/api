const express = require('express');
const bodyParser = require('body-parser');
var app = express();

var indexRouter = require('./routes/index');
var staticRouter = require('./routes/static');
var todoRouter = require('./routes/todo');
var photoRouter = require('./routes/photo');

// Body parser for JSON and X-WWW-FORM-URLENCODED formats
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

// Use .env file
require('dotenv').config();

// TODO: Add CORS

// Serve public files
app.use(express.static(__dirname + '/public'));

// Standard routes
app.use('/', indexRouter);
app.use('/static', staticRouter);
app.use('/images', staticRouter);
app.use('/todo', todoRouter);
app.use('/photo', photoRouter);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}`));
