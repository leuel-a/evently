import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string({ message: 'Email is required.' })
    .email({ message: 'Please provide a valid email.' }),
  password: z.string({ message: 'Password is required.' }),
})

export type LoginType = z.infer<typeof loginSchema>
