'use server'

import { z } from 'zod'
import { auth } from '@/auth'
import prisma from '@/lib/db'
import { Event } from '@/types/event'
import { transformZodErrors, CustomZodErrors } from '@/utils/zod'
import { createEventSchema } from '@/schemas/event'

export const createEvent = async (
  data: FormData,
): Promise<{
  errors: null | CustomZodErrors[]
  data: Event | null
}> => {
  const session = await auth()
  const user = session?.user

  if (!user) {
    return {
      errors: [
        {
          message: 'Unauthorized',
        },
      ],
      data: null,
    }
  }

  try {
    const validatedFields = {
      title: data.get('title'),
      description: data.get('description'),
      category: data.get('category'),
      imageUrl: data.get('imageUrl') === '' ? undefined : data.get('imageUrl'),
      date: new Date(data.get('date') as string),
      startTime: data.get('startTime'),
      endTime: data.get('endTime'),
      location: data.get('location'),
      virtual: data.get('virtual') === 'true',
    }

    // validate the object here on the server too
    const validEvent = createEventSchema.parse(validatedFields)
    
    // create the event on the database
    const event = await prisma.event.create({
      data: {
        ...validEvent,
        createdBy: user.email as string,
      },
    })
    
    return {
      errors: null,
      data: event
    }
  } catch (error: any) {
    console.log(error)
    if (error instanceof z.ZodError) {
      return {
        errors: transformZodErrors(error),
        data: null,
      }
    }
    return {
      errors: [
        {
          message: 'An unexpected error occurred. Could not create shelf.',
        },
      ],
      data: null,
    }
  }
}