import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
const app = express();

// Use .env file
require('dotenv').config();

// Import routers
import indexRouter from './routes/index';
import newsRouter from './routes/news';
import pinsRouter from './routes/pins';

// Middleware for JSON and X-WWW-FORM-URLENCODED formats
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

// Other middleware
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(cookieParser());
app.use(morgan('combined'));

// Serve public files
app.use(express.static('public'));

// Standard routes
app.use('/', indexRouter);
app.use('/news', newsRouter);
app.use('/pin', pinsRouter);

app.listen(process.env.PORT || 8080, () =>
    console.log(`Listening on port ${process.env.PORT || 8080}`)
);

// Start mongoose
const mongoUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}/data?retryWrites=true&w=majority`;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Callbacks for db connections
const db = mongoose.connection;
db.on('error', (error) => {
    console.error(error);
    process.exit(1);
});
db.once('open', () => console.log('Connected to mongodb database!'));
