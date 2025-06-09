import mongoose from 'mongoose'
import userSchema from './schema'
import { modelNames } from '../constants'
import { IUserDocument, IUserModel } from './types';

import { createUser, getUser } from './statics'

userSchema.static('createUser', createUser)
userSchema.static('getUser', getUser)

const User = mongoose.model<IUserDocument, IUserModel>(modelNames.USERS, userSchema)

export default User
