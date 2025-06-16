import {z} from 'zod';

export const signupSchema = z
  .object({
    firstName: z
      .string({message: 'First Name is required'})
      .min(1, {message: 'First Name can not be empty'}),
    lastName: z
      .string({message: 'Last Name is required'})
      .min(1, {message: 'Last Name can not be empty'}),
    email: z
      .string({message: 'Email is required'})
      .email({message: 'Email is not a valid email address'}),
    password: z.string({message: 'Password is required'}),
    confirmPassword: z.string({message: 'Please confirm your password'}),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
