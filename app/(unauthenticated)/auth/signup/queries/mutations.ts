import { MutationFunction } from '@tanstack/react-query'

import { createUser } from '../actions'
import { type IUserModel } from '@/types/user'
import { createUserSchema, type CreateUserType } from '../validation'

// how to make prisma emit the createdAt and updatedAt timestamps
export type CreateUserMutationFunction = MutationFunction<
  Omit<IUserModel, 'createdAt' | 'updatedAt'> | undefined,
  CreateUserType
>

export const createUserMutation: CreateUserMutationFunction = async (data) => {
  const parsed = createUserSchema.safeParse(data)

  if (!parsed.success) {
    throw new Error(parsed?.error.toString())
  }

  try {
    const { data: parsedData } = parsed
    const formData = new FormData()

    formData.set('username', parsedData.username)
    formData.set('email', parsedData.email)
    formData.set('password', parsedData.password)
    formData.set('confirmPassword', parsedData.confirmPassword)

    const { data, errors } = await createUser(formData)

    return { data, errors }
  } catch (error) {
    // TODO: use a logger instead of just logging to the Console
    console.error(error)

    throw new Error('Something went wrong while trying to create a new user')
  }
}
