import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string({ required_error: 'Email is required.' }).email(),
  password: z.string({ required_error: 'Password is required.' })
})

// Regex definition to check for special characters in a password
const specialCharacterPattern = /[!@#$%^&*(),.?":{}|<>]/

export const signupSchema = z
  .object({
    email: z.string({ required_error: 'Email is required.' }).email(),
    password: z
      .string({ required_error: 'Password is required.' })
      .min(8, { message: "Password must be minimum of 8 characters.' })" }),
    confirmPassword: z.string()
  })
  .refine(
    ({ password, confirmPassword }) => {
      password === confirmPassword
    },
    { message: 'Password must match.', path: ['confirmPassword'] }
  )
  .refine(
    ({ password }) => {
      specialCharacterPattern.test(password)
    },
    { message: 'Password must contain atleast one character.', path: ['password'] }
  )
