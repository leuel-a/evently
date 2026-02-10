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
        category: z
            .string({error: 'Required'})
            .min(1, {message: 'Category can not be empty'}),
        address: z.string().optional(),
        country: z.string().optional(),
        city: z.string(),
        capacity: z.coerce.number({error: 'Required'}),
        price: z.number(),
        isFree: z.boolean().default(false),
        isVirtual: z
            .preprocess((v) => (v === 'true' ? true : v === 'false' ? false : v), z.boolean())
            .optional(),
    })
    .refine(
        ({isVirtual, address, country, city}) => {
            if (isVirtual === false) {
                return (
                    Boolean(address && address.trim()) &&
                    Boolean(country && country.trim()) &&
                    Boolean(city && city.trim())
                );
            }
            return true;
        },
        {
            message: 'Address, country, and city are required for in-person events',
            path: ['address'], // You can point this to any one of the fields
        },
    )
    .refine(({isFree, price}) => {
        if (isFree === false) {
            return Boolean(price && price > 0);
        }
        return true;
    });
