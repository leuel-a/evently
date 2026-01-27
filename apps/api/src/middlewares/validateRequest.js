import {validationResult} from 'express-validator';

/**
 * Middleware to run validation and handle errors before controllers.
 *
 * @type {import('express').RequestHandler}
 */
export function validateRequest(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map((err) => ({
                field: err.path,
                message: err.msg,
            })),
        });
    }

    next();
}
