import { Request, Response } from 'express';

type StatusMap = {
    [id: number]: string;
};

const statusList: StatusMap = {
    200: 'Success',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    500: 'Internal Server Error',
};

/**
 * Sends an error with the provided status
 * (see: https://httpstatuses.com/) and error message
 *
 * @param res The express response object
 * @param status The error status code
 * @param message The message to send the user
 */
export function sendError(res: Response, status: number, message: string) {
    res.status(status);
    res.send({
        status,
        statusMessage: `${status} ${statusList[status]}`,
        error: message,
    });
}

/**
 * Checks for authentication token in query parameters
 *
 * @param req The express request object
 */
export function isAuth(req: Request): boolean {
    return req.query['auth'] === process.env.ADMIN_KEY;
}
