import axios from 'axios';
import logger from './logger.js';
import asyncHandler from './asyncHandler.js';
import Observation from '../models/Observation.js';

const getFromAPI = asyncHandler(async ({ month, year }) => {
  logger.info('Starting to fetch data from API');
  const { data: imagesFromAPI } = await axios.get(
    `${process.env.CAT_API}?month=${month}&year=${year}`
  );
  logger.info(`Retrieved ${imagesFromAPI.length} images from the API`);
  return imagesFromAPI;
});

const groupImagesBySequence = asyncHandler(async images => {
  logger.info('Starting sorting by sequence ID');
  const groupedBySeqId = images.reduce((sequences, image) => {
    const currentSequence = sequences[image.sequence_id] || [];
    return { ...sequences, [image.sequence_id]: [...currentSequence, image] };
  }, {});
  logger.info('Finished sorting by sequence ID');
  const numberOfSequences = Object.keys(groupedBySeqId).length;
  logger.info(`Found ${numberOfSequences} new sequences.`);
  return groupedBySeqId;
});

const saveObservations = asyncHandler(async sequences => {
  const observations = [];
  for (let sequence in sequences) {
    const {
      sub_project_id: project_id,
      deployment_id,
      sequence_id,
      latitude,
      longitude,
      date_time_original
    } = sequences[sequence][0];
    const images = sequences[sequence].map(({ image_id }) => ({ image_id }));
    const newObservation = {
      project_id,
      deployment_id,
      sequence_id,
      location: { coordinates: [parseFloat(longitude), parseFloat(latitude)] },
      date_time_original: Date.parse(date_time_original),
      images
    };
    observations.push(newObservation);
  }
  await Observation.insertMany(observations);
  logger.info(`Saved ${observations.length} new observations to the database`);
});

const getCats = asyncHandler(async () => {
  const date = new Date();
  const range = { month: date.getMonth(), year: date.getFullYear() };
  const images = await getFromAPI(range);
  const sequences = await groupImagesBySequence(images);
  await saveObservations(sequences);
});

export default getCats;
