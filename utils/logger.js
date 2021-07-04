import { existsSync, mkdirSync } from 'fs';
import winston from 'winston';
import 'winston-daily-rotate-file';
const {
  transports: { DailyRotateFile },
  createLogger,
  format: { combine, timestamp, label, printf }
} = winston;

const logsDir = process.env.LOGS_PATH || './logs';

if (!existsSync(logsDir)) {
  mkdirSync(logsDir, {
    recursive: true
  });
}

const logFormat = printf(({ level, message, label, timestamp }) => `${timestamp} [${label}] ${level}: ${message}`);

const transport = new DailyRotateFile({
  dirname: logsDir,
  filename: 'cat-fetch-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});

const logger = createLogger({
  format: combine(label({ label: 'Cat fetch' }), timestamp(), logFormat),
  transports: [transport]
});

export default logger;
