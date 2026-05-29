import winston from 'winston';
import lodashCap from 'lodash/capitalize';

const logFormat: winston.Logform.Format = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({stack: true}),
    winston.format.json(),
);

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

export const ERROR_LOGFILE = 'logs/error.log';
export const COMBINED_LOGFILE = 'logs/combined.log';

const logger: winston.Logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: logFormat,
    defaultMeta: {service: 'express-app'},
    transports: [
        new winston.transports.File({
            filename: ERROR_LOGFILE,
            level: 'error',
            maxsize: 5242880,
            maxFiles: 5,
        }),
        new winston.transports.File({
            filename: COMBINED_LOGFILE,
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
