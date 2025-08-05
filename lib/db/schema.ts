import {z} from 'zod';

export type LoginUserSchemaType = z.infer<typeof loginUserSchema>;
export const loginUserSchema = z.object({
    email: z.string({required_error: 'Email is required'}).email({message: 'Please provide a valid email address'}),
    password: z.string({required_error: 'Password is required'}).min(1, {message: 'Password can not be an empty string'}),
});

export type UserSignupSchemaType = z.infer<typeof userSignupSchema>;
export const userSignupSchema = z
    .object({
        name: z.string({required_error: 'Required'}).min(1, {message: 'Name can not be empty'}),
        email: z.string().transform((value) => value.toLowerCase()),
        password: z.string({required_error: 'Required'}).min(1, {message: 'Password can not be an empty string'}),
        confirmPassword: z.string(),
        isOrganizer: z.coerce.boolean().optional(),
        organizationName: z.string().optional(),
    })
    .refine(
        ({password, confirmPassword}) => {
            if (password.length == 0) return true;
            return password === confirmPassword;
        },
        {message: 'Passwords do not match', path: ['confirmPassword']},
    );

export type EventSchemaType = z.infer<typeof eventsSchema>;
export const eventsSchema = z.object({
    title: z.string({required_error: 'Title is required'}).min(5, {message: 'Title must be a min of 50 characters'}),
    description: z.string({required_error: 'Description is required'}).min(10, 'Description can not be less than 200 characters'),
    date: z.coerce.date(),
    // !(todo) -> find a better way to handle the validation of the startTime and endTime
    startTime: z.string({required_error: 'Start Time is required'}).min(1),
    endTime: z.string().optional(),
    category: z.string({required_error: 'Category is required'}).min(1, {message: 'Category can not be empty'}),
    address: z.string().min(1, {message: 'Address can not be empty'}),
    country: z.string().min(1, {message: 'Country is required'}),
    city: z.string().min(1, {message: 'City is required'}),
    capacity: z.string(),
    isVirtual: z.coerce.boolean(),
});
