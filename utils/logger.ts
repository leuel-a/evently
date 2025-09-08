import {createLogger, format, transports} from 'winston';

const logFormat = format.printf(({level, message, timestamp, ...meta}) => {
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return `${timestamp} [${level}]: ${message}${metaStr}`;
});

const logger = createLogger({
    level: process.env.LOG_LEVEL ?? 'info',
    format: format.combine(format.errors({stack: false}), format.timestamp(), logFormat),
    // TODO: figure out how to do logs to files in client side, because it does not work out of the box
    // transports: [new transports.Console(), new transports.File({filename: 'error.log', level: 'error'})],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: format.combine(format.colorize(), format.timestamp(), logFormat),
        }),
    );
}

export default logger;
