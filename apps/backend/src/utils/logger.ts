import dayjs from "dayjs";
import winston from "winston";
import enviroment from "@/config/enviroment"; "@/config/enviroment";

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
	const formattedTime = dayjs(timestamp as string).format("YYYY-MM-DD HH:mm:ss");
	return `[${level.toUpperCase()}] (${formattedTime}) ${message}`;
});

const logger = winston.createLogger({
	level: 'info',
	format: winston.format.json(),
	transports: [
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
		new winston.transports.File({ filename: 'combined.log'})
	]
})


if (enviroment.nodeEnv === 'development') {
	logger.add(new winston.transports.Console({
		format: winston.format.combine(
			winston.format.timestamp(),
			customFormat
		)
	}))
}

export { logger }
