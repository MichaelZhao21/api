const express = require('express');
const cors = require('cors');
var app = express();

// Use .env file
require('dotenv').config();

// Import routers
var indexRouter = require('./routes/index'); // Home page + Admin page
var staticRouter = require('./routes/static'); // Serve static images from Dropbox
var todoRouter = require('./routes/todo'); // TODO: remove this todo endpoint
var photoRouter = require('./routes/photo'); // Unsplash photos API -> Also get rid of or reduce
var loggingRouter = require('./routes/logging'); // Logging endpoint

// Body parser for JSON and X-WWW-FORM-URLENCODED formats
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// Use CORS
app.use(cors());

// App routes
app.use('/', indexRouter);
app.use(['/static', '/images'], staticRouter);
app.use('/todo', todoRouter);
app.use('/photo', photoRouter);
app.use('/log', loggingRouter);

app.listen(process.env.PORT || 8080, () =>
    console.log(`Listening on port ${process.env.PORT || 8080}`)
);
