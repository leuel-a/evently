import {EVENT_TYPE} from '@/types/events';
import {z} from 'zod';

export type EventSchemaType = z.infer<typeof eventsSchema>;
export const eventsSchema = z
    .object({
        title: z
            .string({error: 'Required'})
            .min(5, {message: 'Title must be a min of 50 characters'}),
        description: z
            .string({error: 'Required'})
            .min(10, {message: 'Description can not be less than 200 characters'}),
        date: z.coerce.date(),
        startTime: z.string({error: 'Required'}).min(1),
        endTime: z.string().optional(),
        category: z.string({error: 'Required'}),
        location: z.string().optional(),
        country: z.string().optional(),
        city: z.string(),
        capacity: z.coerce.number({error: 'Required'}),
        type: z.enum(Object.values(EVENT_TYPE), {error: 'Required'}),
        ticketPrice: z.coerce.number(),
        isFree: z.boolean().default(false),
        isVirtual: z
            .preprocess((v) => (v === 'true' ? true : v === 'false' ? false : v), z.boolean())
            .optional(),
        virtualUrl: z.string().optional(),
    })
    .refine(
        ({isVirtual, location, country, city}) => {
            if (isVirtual === false) {
                return (
                    Boolean(location && location.trim()) &&
                    Boolean(country && country.trim()) &&
                    Boolean(city && city.trim())
                );
            }
            return true;
        },
        {
            message: 'Location, country, and city are required for in-person events',
            path: ['location'], // You can point this to any one of the fields
        },
    )
    .refine(({isFree, ticketPrice: price}) => {
        if (isFree === false) {
            return Boolean(price && price > 0);
        }
        return true;
    })
    .transform((values) => {
        return {
            ...values,
            type: values.isVirtual ? EVENT_TYPE.VIRTUAL : EVENT_TYPE.PHYSICAL,
        };
    });
