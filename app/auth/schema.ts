import {z} from 'zod';

export const loginSchema = z.object({
  email: z
    .string({required_error: 'Email is required'})
    .email({message: 'Please provide a valid email address'}),
  password: z
    .string({required_error: 'Password is required'})
    .min(1, {message: 'Password can not be an empty string'}),
});

export const userSignupSchema = z
  .object({
    name: z.string({required_error: 'Required'}).min(1, {message: 'Name can not be empty'}),
    email: z
      .string({required_error: 'Required'})
      .email({message: 'Invalid email, please provide a valid email address'}),
    password: z
      .string({required_error: 'Required'})
      .min(1, {message: 'Password can not be an empty string'}),
    confirmPassword: z.string(),
    isOrganizer: z.boolean().optional(),
    organizationName: z.string().optional(),
  })
  .refine(
    ({password, confirmPassword}) => {
      if (password.length == 0) return true;
      return password === confirmPassword;
    },
    {message: 'Passwords do not match', path: ['confirmPassword']},
  );

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type UserSignupSchemaType = z.infer<typeof userSignupSchema>;
