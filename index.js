import 'dotenv/config.js';
import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler.js';
import verifyToken from './middlewares/verifyToken.js';
import { scheduleJob } from 'node-schedule';
import getCats from './utils/getCats.js';
import logger from './utils/logger.js';
import './db/mongoose.js';
import { getReport, uploadCSV } from './controllers/observations.js';

process.env.CRON && scheduleJob(process.env.CRON, () => getCats());

const app = express();
const port = process.env.PORT || 8000;

if (process.env.NODE_ENV !== 'production') {
  const morgan = await import('morgan');
  app.use(morgan.default('dev'));
}
app.use(mongoSanitize());
app.use(cors({ origin: process.env.ORIGIN, exposedHeaders: 'Content-Disposition' }));
app.get('/startDate/:startDate/endDate/:endDate', verifyToken, getReport);
app.post('/', uploadCSV);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));

process.on('unhandledRejection', error => {
  logger.error(error.message);
  return;
});
