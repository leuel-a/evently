import { z } from 'zod'

export const createUserSchema = z.object({
  email: z
    .string({ message: 'Required' })
    .email({ message: 'Please provide a valid email address' }),
  password: z
    .string({ message: 'Required' })
    .min(8, { message: 'Password must be greater than 8 characters' }),
})

export type CreateUserType = z.infer<typeof createUserSchema>
