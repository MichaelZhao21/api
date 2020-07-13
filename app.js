const express = require('express');
const bodyParser = require('body-parser');
var app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI');
var postUpRouter = require('./routes/postUp'); // TODO: doesn't work bc google project is gone rip
var ghHookRouter = require('./routes/ghHook');

app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/postup', postUpRouter);
app.use('/gh-hook', ghHookRouter);

app.listen(8080);