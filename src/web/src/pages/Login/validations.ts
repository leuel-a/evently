import {z} from 'zod';

export const loginSchema = z.object({
  email: z
    .string({message: 'Email is required'})
    .email({message: 'Email is not a valid email address'}),
  password: z.string({message: 'Password is required'}),
});

export type LoginSchema = z.infer<typeof loginSchema>;
