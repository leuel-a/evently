import { z } from 'zod'

export const createEventSchema = z
  .object({
    title: z
      .string({ message: 'Event title is required' })
      .min(1, { message: 'Event title can not be empty' }),
    description: z
      .string({
        message: 'Event description is required',
      })
      .min(100, { message: 'Event description must be a min of 100 characters ' })
      .max(1000, { message: 'Event description can not exceed 1000 characters' }),
    imageUrl: z.string().optional(),
    date: z.date({ message: 'Event date is required' }),
    startTime: z.string().min(1, { message: 'Event start time is required.' }),
    endTime: z.string().optional(),
    location: z.string().optional(),
    virtual: z.boolean().default(false),
    category: z
      .string({ message: 'Category for the event is required' })
      .min(1, { message: 'Category can not be empty' }),
  })
  .refine(({ virtual, location }) => virtual || !!location || (location && location.length === 0), {
    message: 'Location is required if the the event is not virtual',
    path: ['location'],
  })

export const updateEventSchema = z
  .object({
    title: z
      .string({ message: 'Event title is required' })
      .min(1, { message: 'Event title can not be empty' }),
    description: z
      .string({
        message: 'Event description is required',
      })
      .min(100, { message: 'Event description must be a min of 100 characters ' })
      .max(1000, { message: 'Event description can not exceed 1000 characters' }),
    imageUrl: z.string().optional(),
    date: z.date({ message: 'Event date is required' }),
    startTime: z.string().min(1, { message: 'Event start time is required.' }),
    endTime: z.string().optional(),
    location: z.string().optional(),
    virtual: z.boolean().default(false),
    category: z
      .string({ message: 'Category for the event is required' })
      .min(1, { message: 'Category can not be empty' }),
  })
  .refine(({ virtual, location }) => virtual || !!location || (location && location.length === 0), {
    message: 'Location is required if the the event is not virtual',
    path: ['location'],
  })

export type CreateEventType = z.infer<typeof createEventSchema>
export type UpdateEventType = z.infer<typeof updateEventSchema>
