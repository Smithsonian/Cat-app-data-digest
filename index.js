import 'dotenv/config.js';
import { scheduleJob } from 'node-schedule';
import getCats from './utils/getCats.js';
import logger from './utils/logger.js';
import './db/mongoose.js';

getCats({ month: 12, year: 2020 });

// scheduleJob(process.env.CRON, () => getCats());

process.on('unhandledRejection', error => {
  logger.error(error.message);
  return;
});
