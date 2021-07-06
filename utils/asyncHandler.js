import logger from './logger.js';

const asyncHandler = fn => params => Promise.resolve(fn(params)).catch(err => logger.error(err));
export default asyncHandler;
