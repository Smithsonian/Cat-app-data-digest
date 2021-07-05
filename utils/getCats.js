import axios from 'axios';
import logger from './logger.js';
import asyncHandler from './asyncHandler.js';

const getCats = asyncHandler(async () => {
  const { data } = await axios.get(`${process.env.CAT_API}?month=1&year=2021`);
  logger.info(`Success! Found ${data.length} observations.`);
});

export default getCats;
