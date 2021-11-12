const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', async function (req, res, next) {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// router.get('/admin', async function (req, res, next) {
//     res.sendFile(path.join(__dirname, '../../public/admin.html'));
// });

module.exports = router;
