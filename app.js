var express = require('express');
var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/testAPI', testAPIRouter);

app.listen(8080, '172.31.62.232');