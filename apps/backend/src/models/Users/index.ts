import mongoose from 'mongoose'
import userSchema, { UserDocument } from './schema'
import { modelNames } from '../constants'

import * as staticFunctions from './statics'

userSchema.static(staticFunctions)

const User = mongoose.model(modelNames.USERS, userSchema)

export interface UserModel extends mongoose.Model<UserDocument> {} 
export default User
