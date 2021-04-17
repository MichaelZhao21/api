const statusCodes = {
    200: 'Success',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    500: 'Internal Server Error',
};

/**
 * Send a formatted JSON error object to the user
 * @param {import("express").Response} res Response object
 * @param {number} status HTTP Status code
 * @param {string} message Error message
 */
function sendError(res, status, message) {
    res.status(status);
    res.send({
        status,
        statusMessage: `${status}: ${statusCodes[status]}`,
        error: message,
    });
}

function randInt(min, max) {
    return Math.random() * (max - min) + max;
}

module.exports = { randInt, sendError };
