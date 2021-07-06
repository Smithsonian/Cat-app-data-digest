import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const observationImageSchema = new Schema({
  observation_id: { type: ObjectId, ref: 'Observation', required: true },
  sequence_id: { type: String, required: true },
  image_id: { type: String, required: true }
});

export default model('Observation', observationImageSchema);
