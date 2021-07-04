import 'dotenv/config.js';
import { scheduleJob } from 'node-schedule';
import getCats from './utils/getCats.js';

getCats();
scheduleJob(process.env.CRON, () => getCats());
