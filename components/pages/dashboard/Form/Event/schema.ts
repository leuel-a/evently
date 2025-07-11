import {z} from 'zod';

export const eventsSchema = z.object({
    title: z.string({required_error: 'Event title is required'}),
    description: z.string({required_error: 'Event description is required'}),
    date: z.date(),
    startTime: z.string({required_error: 'Event start time is required'}),
    endTime: z.string().optional(),
    category: z.string({required_error: 'Event category is required'}),
    address: z.string(),
    country: z.string(),
    city: z.string(),
    isVirtual: z.boolean(),
});

export type EventSchemaType = z.infer<typeof eventsSchema>;
