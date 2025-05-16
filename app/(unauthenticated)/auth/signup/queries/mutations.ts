import { MutationFunction } from '@tanstack/react-query'

import { prisma } from '@/lib/db'
import { type IUserModel } from '@/types/user'
import { createUserSchema, type CreateUserType } from '../validation'

export type CreateUserMutationFunction = MutationFunction<IUserModel, CreateUserType>

export const createUserMutation: CreateUserMutationFunction = async (data) => {
  const parsed = createUserSchema.safeParse(data)

  if (!parsed.success) {
    throw new Error(parsed?.error.toString())
  }

  try {
    // TODO: hash the password of the user before saving the
    // user to the database
    const user = await prisma.user.create({ data: parsed.data })

    return user
  } catch (error) {
    throw new Error('Error while trying to create a user')
  }
}
