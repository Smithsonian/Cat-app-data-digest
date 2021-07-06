import mongoose from 'mongoose';
import logger from '../utils/logger.js';

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) =>
  err ? logger.error(err) : logger.info(`Connected to MongoDB @ ${db.connections[0].host}`)
);
