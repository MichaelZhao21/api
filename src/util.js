const statusList = {
    "200": "Success",
    "400": "Bad Request",
    "401": "Unauthorized",
    "403": "Forbidden",
    "500": "Internal Server Error"
};

/**
 * Sends an error with the provided status
 * (see: https://httpstatuses.com/) and error message
 *
 * @param {import("express").Response} res The express response object
 * @param {number} status The error status code
 * @param {string} message The message to send the user
 */
 function sendError(res, status, message) {
    res.status(status);
    res.send({
        status,
        statusMessage: `${status} ${statusList[status]}`,
        error: message,
    });
}

module.exports = { sendError };