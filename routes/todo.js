var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

const todoFilePath = path.join(__dirname, '/files/todo.md');

router.get('/', function(req, res, next) {
    fs.readFile(todoFilePath, 'utf8', function(err, data) {
        if (err) {
            res.sendStatus(500);
            return console.log(err);
        }
        res.send(data);
    }); 
});

router.post('/edit', function(req, res, next) {
    if (req.body.data) {
        fs.writeFile(todoFilePath, req.body.data, 'utf8', function (err) {
            if (err) {
                res.sendStatus(500);
                return console.log(err);
            }
            res.sendStatus(200);
        });
    }
    else {
        res.sendStatus(400);
    }
});

module.exports = router;