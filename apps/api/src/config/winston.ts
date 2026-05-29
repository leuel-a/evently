import winston from 'winston';

const ERROR_LOG_FILE = 'logs/error.log';
const COMBINED_LOG_FILE = 'logs/combined.log';

const fileOptions = {
    maxSize: 2e6,
};

const transportOptions = [
    new winston.transports.File({
        filename: ERROR_LOG_FILE,
        level: 'error',
        ...fileOptions,
    }),
    new winston.transports.File({
        filename: COMBINED_LOG_FILE,
        ...fileOptions,
    }),
];

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: transportOptions,
});

export default logger;
