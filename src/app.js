const express = require('express');
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
var usageRouter = require('./routes/usage');
var newsRouter = require('./routes/news');

// Body parser for JSON and X-WWW-FORM-URLENCODED formats
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// Use CORS
app.use(cors());

// Serve public files
app.use(express.static('public'));

// App routes
app.use('/', indexRouter); // Home page + Admin page
app.use(['/static', '/images'], staticRouter); // Serve static images from Dropbox
app.use('/todo', todoRouter); // TODO: remove this todo endpoint
app.use('/photo', photoRouter); // Unsplash photos API -> Also get rid of or reduce
app.use('/log', loggingRouter); // Logging endpoint
app.use('/usage', usageRouter); // Log app usage :)
app.use('/news', newsRouter); // NYT API

app.listen(process.env.PORT || 8080, () =>
    console.log(`Listening on port ${process.env.PORT || 8080}`)
);
