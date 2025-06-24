import mongoose from 'mongoose';

const eventTypesSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export default eventTypesSchema;
