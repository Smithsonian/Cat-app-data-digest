import axios from 'axios';
import logger from './logger.js';
import asyncHandler from './asyncHandler.js';
import Observation from '../models/Observation.js';

const getCats = asyncHandler(async () => {
  logger.info('Starting to fetch data from API');
  const { data: eMammalImages } = await axios.get(`${process.env.CAT_API}?month=1&year=2021`);
  logger.info(`Retrieved ${eMammalImages.length} images from the API`);
  logger.info('Starting sorting by sequence ID');
  const groupedBySeqId = eMammalImages.reduce((sequences, image) => {
    const currentSequence = sequences[image.sequence_id] || [];
    return { ...sequences, [image.sequence_id]: [...currentSequence, image] };
  }, {});
  logger.info('Finished sorting by sequence ID');
  const numberOfSequences = Object.keys(groupedBySeqId).length;
  logger.info(`Found ${numberOfSequences} new sequences.`);
  const observations = [];
  let imagesByObservation = [];
  for (let sequence in groupedBySeqId) {
    const { sequence_id, latitude, longitude, date_time_original } = groupedBySeqId[sequence][0];
    const newObservation = await Observation.create({ sequence_id, latitude, longitude, date_time_original });
    observations.push(newObservation);
    const test = groupedBySeqId[sequence].map(({ image_id }) => ({ sequence_id, image_id }));
    imagesByObservation = [...imagesByObservation, ...test];
  }
  logger.info(`Found ${imagesByObservation.length} images for ${observations.length} new observations.`);
});

export default getCats;
