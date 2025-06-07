import _ from 'lodash'
import dayjs from 'dayjs'
import { UserModel } from '.'
import { logger } from '@/utils/logger'
import { hashPassword } from '@/utils/password'
import { AppError, ERROR_ENUM } from '@/models/AppError'

export interface CreateUserPayload {
  email: string
  password: string
  firstName: string
  lastName: string
  dateOfBirth: string
}

export async function createUser(this: UserModel, input: CreateUserPayload) {
  try {
    const { email, password, firstName, lastName, dateOfBirth } = input

    const emailExists = await this.findOne({ email }).lean()
    if (emailExists) {
      throw new AppError(
        'Email is already registered, please try another email',
        ERROR_ENUM.EMAIL_ALREADY_TAKEN,
      )
    }

    let hashedPassword: string
    try {
      hashedPassword = await hashPassword(password)
    } catch (error) {
      throw new AppError('Failed to hash password', ERROR_ENUM.INTERNAL_SERVER_ERROR)
    }

    const userData = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      dateOfBirth,
    }

    const user = await this.create(userData)
    return _.omit(user.toObject(), ['password'])
  } catch (error) {
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError('Failed to create user', ERROR_ENUM.INTERNAL_SERVER_ERROR)
  }
}
