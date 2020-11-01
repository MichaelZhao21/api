const express = require('express');
const bodyParser = require('body-parser');
var app = express();

var indexRouter = require('./routes/index');
var todoRouter = require('./routes/todo');
var photoRouter = require('./routes/photo');

app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/todo', todoRouter);
app.use('/photo', photoRouter);
app.use(express.static('public'));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}`));