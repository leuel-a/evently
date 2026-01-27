import winston from 'winston';
import lodashCap from 'lodash/capitalize.js';

/** @type {winston.Logform.Format} */
const logFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({stack: true}),
    winston.format.json(),
);

/** @type {winston.Logform.Format} */
const consoleFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({stack: true}),
    winston.format.colorize(),
    winston.format.printf(({timestamp, level, message, stack}) => {
        if (stack) {
            return `${timestamp} [${lodashCap(level)}]: ${message}\n${stack}`;
        }
        return `${timestamp} [${lodashCap(level)}]: ${message}`;
    }),
);

/** @type {winston.Logger} */
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat,
    defaultMeta: {service: 'express-app'},
    transports: [
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            maxsize: 5242880,
            maxFiles: 5,
        }),
        new winston.transports.File({
            filename: 'logs/combined.log',
            maxsize: 5242880,
            maxFiles: 5,
        }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: consoleFormat,
        }),
    );
}

export {logger};
