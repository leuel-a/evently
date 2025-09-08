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
        // email: z.string().transform((value) => value.toLowerCase()),
        email: z.string({required_error: 'Required'}).email({message: 'Please provide a valid email address'}),
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
export const eventsSchema = z
    .object({
        title: z.string({required_error: 'Title is required'}).min(5, {message: 'Title must be a min of 50 characters'}),
        description: z.string({required_error: 'Description is required'}).min(10, {message: 'Description can not be less than 200 characters'}),
        date: z.coerce.date(),
        startTime: z.string({required_error: 'Start Time is required'}).min(1),
        endTime: z.string().optional(),
        category: z.string({required_error: 'Category is required'}).min(1, {message: 'Category can not be empty'}),
        address: z.string().optional(),
        country: z.string().optional(),
        city: z.string(),
        capacity: z.coerce.number({required_error: 'Capacity is required'}),
        isVirtual: z.preprocess((v) => (v === 'true' ? true : v === 'false' ? false : v), z.boolean()).optional(),
    })
    .refine(
        ({isVirtual, address, country, city}) => {
            if (isVirtual === false) {
                return Boolean(address && address.trim()) && Boolean(country && country.trim()) && Boolean(city && city.trim());
            }
            return true;
        },
        {
            message: 'Address, country, and city are required for in-person events',
            path: ['address'], // You can point this to any one of the fields
        },
    );
