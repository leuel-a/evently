import mongoose from 'mongoose'

export interface UserDocument extends mongoose.Document {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: Date
}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String, required: false },
  },
  { timestamps: true },
)

export default userSchema
