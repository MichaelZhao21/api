const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var app = express();

// Use .env file
require('dotenv').config();

// Import routers
var indexRouter = require('./routes/index');
var staticRouter = require('./routes/static');
var todoRouter = require('./routes/todo');
var photoRouter = require('./routes/photo');
var loggingRouter = require('./routes/logging');
var dbRouter = require('./routes/db');

// Body parser for JSON and X-WWW-FORM-URLENCODED formats
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// Use CORS
app.use(cors());

// Serve public files
app.use(express.static(__dirname + '/public'));

// Standard routes
app.use('/', indexRouter);
app.use(['/static', '/images'], staticRouter);
app.use('/todo', todoRouter);
app.use('/photo', photoRouter);
app.use('/log', loggingRouter);
app.use('/db', dbRouter);

app.listen(process.env.PORT || 8080, () =>
    console.log(`Listening on port ${process.env.PORT || 8080}`)
);
