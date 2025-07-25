import {z} from 'zod';

export const eventsSchema = z.object({
    title: z.string({required_error: 'Title is required'}).min(5, {message: 'Title must be a min of 50 characters'}),
    description: z.string({required_error: 'Description is required'}).min(10, 'Description can not be less than 200 characters'),
    date: z.date(),
    startTime: z.string({required_error: 'Start Time is required'}).min(1), // TODO: come up with a better way to create the startTime
    endTime: z.string().optional(),
    category: z.string({required_error: 'Category is required'}).min(1, {message: 'Category can not be empty'}),
    address: z.string().min(1, {message: 'Address can not be empty'}),
    country: z.string().min(1, {message: 'Country is required'}),
    city: z.string().min(1, {message: 'City is required'}),
    capacity: z.string(),
    isVirtual: z.boolean(),
});

export type EventSchemaType = z.infer<typeof eventsSchema>;
