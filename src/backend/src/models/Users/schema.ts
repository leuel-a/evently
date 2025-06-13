import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },

  // TODO: check if the date of birth should be stored as a date or a plain string
  dateOfBirth: { type: String, required: false },
});

export default userSchema;
