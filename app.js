const express = require('express');
const bodyParser = require('body-parser');
var app = express();

var indexRouter = require('./routes/index');
var imagesRouter = require('./routes/images');
var todoRouter = require('./routes/todo');
var photoRouter = require('./routes/photo');

app.use(bodyParser.json());

// TODO: Add CORS

app.use('/', indexRouter);
app.use('/images', imagesRouter);
app.use('/todo', todoRouter);
app.use('/photo', photoRouter);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}`));