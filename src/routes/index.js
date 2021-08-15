const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', async function (req, res, next) {
    res.send({
        greeting:
            "Hello! I hope your doing well :33 Feel free to use any resource on my api, keeping in mind that its only being run from a low-end single server and is likely to change at any time.",
        routes: {
            '/': 'Returns this message',
            '/admin': 'Requires admin password to access!',
            '/news': 'Returns the top headlines from AP News, BBC News, and Google News',
        },
        todo: 'Turn this JSON response into a single page app :)',
    });
});

router.get('/admin', async function (req, res, next) {
    res.sendFile(path.join(__dirname, '..', 'public', 'pages', 'admin.html'));
});

module.exports = router;
