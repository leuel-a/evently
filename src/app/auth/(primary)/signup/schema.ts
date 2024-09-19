import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string({ message: 'Name is required' }),
  email: z.string({ message: 'Email is required' }),
  password: z.string({ message: 'Password is required' }),
})

export type CreateUserType = z.infer<typeof createUserSchema>
