const { sendError } = require('./util');

/**
 * Checks to see if the key matches the admin key
 *
 * @param {import("express").Request} req The express request object
 * @param {import("express").Response} res The express response object
 * @returns {boolean} True if the key matches the admin key
 */
module.exports = function (req, res) {
    if (req.headers['authorization'] === undefined) {
        sendError(res, 401, 'No authorization credentials defined');
        return false;
    }
    if (atob(req.headers['authorization']) !== process.env.ADMIN_KEY) {
        sendError(res, 401, 'Invalid authorization credentials');
        return false;
    }
    return true;
};
