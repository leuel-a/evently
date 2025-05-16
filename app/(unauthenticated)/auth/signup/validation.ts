import { z } from 'zod'

export const createUserSchema = z
  .object({
    username: z.string({ message: 'Required' }).min(1, { message: 'Username can not be empty' }),
    email: z
      .string({ message: 'Required' })
      .email({ message: 'Please provide a valid email address' }),
    password: z
      .string({ message: 'Required' })
      .min(8, { message: 'Password must be a min of 8 characters' }),
    confirmPassword: z.string({ message: 'Please enter your password again for confirmation' }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })

export type CreateUserType = z.infer<typeof createUserSchema>
