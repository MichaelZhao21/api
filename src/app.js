const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
var app = express();

// Use .env file
require('dotenv').config();

// Make sure the correct variables are defined
checkEnv();

// Import routers
const indexRouter = require('./routes/index');
const newsRouter = require('./routes/news');
const backgroundRouter = require('./routes/background');

// Body parser for JSON and X-WWW-FORM-URLENCODED formats
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// Use CORS
app.use(cors());

// Use compression middleware
app.use(compression());

// Parse cookies
app.use(cookieParser());

// Log all requests to STDOUT
app.use(morgan('combined'));

// Serve public files
app.use(express.static('public'));

// App routes
app.use('/', indexRouter); // Home page + Admin page
app.use('/news', newsRouter); // NYT API
app.use('/background', backgroundRouter); // Background Unsplash API

// Start express server
app.listen(process.env.PORT || 8080, () =>
    console.log(`Listening on port ${process.env.PORT || 8080}`)
);

// Start mongoose
const mongoUrl = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}/data?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Callbacks for db connections
const db = mongoose.connection;
db.on('error', (error) => {
    console.error(error);
    process.exit(1);
});
db.once('open', () => console.log('Connected to mongodb database!'));

function checkEnv() {
    const envList = ['MONGO_USER', 'MONGO_PASS', 'MONGO_URL', 'ADMIN_PASS', 'NYT_API_KEY', 'UNSPLASH_ACCESS', 'UNSPLASH_SECRET'];
    envList.forEach((e) => {
        if (process.env[e] === undefined) {
            console.error(`ERROR: The ${e} environmental variable was not defined.`);
            process.exit(1);
        }
    })
}