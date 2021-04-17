const mongoose = require('mongoose');
const taskTabSchema = require('./taskTabUser');

// Connect to the DB
const DB_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}/task-tab?retryWrites=true&w=majority`;
const connection = mongoose.createConnection(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const TaskTabUser = connection.model('Task Tab User', taskTabSchema, 'users');

module.exports = { TaskTabUser, connection };
