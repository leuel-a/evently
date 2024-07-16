import { z } from 'zod'

export const eventLocationSchema = z.object({
  city: z.string().optional(),
  address: z.string().optional(),
  directions: z.string().optional()
})

export const createEventSchema = z
  .object({
    title: z
      .string({ required_error: 'Event title is required.' })
      .min(1, { message: 'Event title must contain a min of 1 character' }),
    description: z
      .string({ required_error: 'Event description is required.' })
      .min(25, { message: 'Event description must be a min of 25 characters.' }),
    date: z.date({
      required_error: 'Event date is required.',
      message: 'Event date must be a valid date.'
    }),
    time: z.string().optional(),
    fee: z.number({
      required_error: 'Event price is required.',
      message: 'Event price must be a valid number/decimal.'
    }),
    type: z.string().optional()
  })
  .and(eventLocationSchema)

export type CreateEventValues = z.infer<typeof createEventSchema>
