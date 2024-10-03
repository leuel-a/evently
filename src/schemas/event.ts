import { z } from 'zod'

export const createEventSchema = z.object({
  title: z
    .string({ message: 'Event title is required' })
    .min(1, { message: 'Event title can not be empty' }),
  description: z
    .string({
      message: 'Event description is required',
    })
    .min(100, { message: 'Event description must be a min of 100 characters ' })
    .max(250, { message: 'Event description can not exceed 100 characters' }),
  imageUrl: z.string().optional(),
  date: z.date(),
  startTime: z.string(),
  endTime: z.string().optional(),
  location: z.string().optional(),
  virtual: z.boolean().default(false).optional(),
  category: z.string({ message: 'Category for the event is required' }),
})

export type CreateEventType = z.infer<typeof createEventSchema>
