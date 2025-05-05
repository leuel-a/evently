import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string({message: 'Required'}).email({ message: 'Please provide a valid email address' }),
	password: z.string({message: 'Required'})
})

export type LoginSchemaType = z.infer<typeof loginSchema>
