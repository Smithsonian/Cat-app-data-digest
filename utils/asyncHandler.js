import logger from './logger.js';

const asyncHandler = fn => () => Promise.resolve(fn()).catch(err => logger.error(err));
export default asyncHandler;
