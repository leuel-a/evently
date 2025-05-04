import { z } from 'zod';

export const signupSchema = z.object({
	firstName: z.string({ message: 'Required' }),
	lastName: z.string({ message: 'Required' }),
	email: z.string({ message: 'Required' })
		.email({ message: 'Please provide a valid email address' }),
	password: z.string({ message: 'Required' })
		.min(8, { message: 'Password must be a min of 8 characters' }),
	confirmPassword: z.string({ message: 'Please enter your password again for confirmation' })
}).refine(({ password, confirmPassword }) => password === confirmPassword, { message: 'Passwords do no match.' })

export type SignupSchemaType = z.infer<typeof signupSchema>

