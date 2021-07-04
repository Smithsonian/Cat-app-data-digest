import axios from 'axios';
import logger from './logger.js';

const getCats = async () => {
  try {
    const data = await axios.get(process.env.CAT_API);
    logger.info('Success');
  } catch (error) {
    logger.error(error.message);
  }
};

export default getCats;
