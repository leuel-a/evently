'use server'

import { z } from 'zod'
import { auth } from '@/auth'
import prisma from '@/lib/db'
import { Event } from '@/types/event'
import { transformZodErrors, CustomErrors } from '@/utils/zod'
import { createEventSchema, updateEventSchema } from '@/schemas/event'
import { revalidatePath } from 'next/cache'

export const getEvents = async (
  email?: string,
): Promise<{ errors: CustomErrors[] | null; data: Event[] | null }> => {
  try {
    const events = await prisma.event.findMany({
      where: { createdBy: email },
    })
    return {
      errors: null,
      data: events,
    }
  } catch (error) {
    return {
      errors: [{ message: 'An unexpected error occurred. Could not fetch events.' }],
      data: null,
    }
  }
}

export const createEvent = async (
  data: FormData,
): Promise<{
  errors: null | CustomErrors[]
  data: Event | null
}> => {
  const session = await auth()
  const user = session?.user

  if (!user) {
    return {
      errors: [{ message: 'Unauthorized' }],
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

    revalidatePath('/dashboard/events')
    return {
      errors: null,
      data: event,
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return {
        errors: transformZodErrors(error),
        data: null,
      }
    }
    return {
      errors: [{ message: 'An unexpected error occurred. Could not create event.' }],
      data: null,
    }
  }
}

export const updateEvent = async (
  data: FormData,
): Promise<{
  errors: CustomErrors[] | null
}> => {
  const session = await auth()
  const user = session?.user

  if (!user) {
    return {
      errors: [{ message: 'Unauthorized' }],
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

    const idValue = data.get('id')
    const id = idValue !== null ? Number(idValue) : null

    // id must be passed with the form data to the server action
    if (!id) {
      return { errors: [{ message: 'Event ID is required' }] }
    }

    const validEvent = updateEventSchema.parse(validatedFields)

    await prisma.event.update({
      where: { id },
      data: { ...validEvent },
    })

    revalidatePath('/dashboard/events')
    return { errors: null }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = transformZodErrors(error)
      return {
        errors,
      }
    }
    return { errors: [{ message: 'An unexpected error occurred. Could not update event.' }] }
  }
}

export const deleteEvent = async (data: FormData): Promise<{ errors: CustomErrors[] | null }> => {
  const session = await auth()
  const user = session?.user

  if (!user) {
    return { errors: [{ message: 'Unauthorized' }] }
  }

  try {
    const idValue = data.get('id')
    const id = idValue ? Number(idValue) : null

    if (!id) {
      return { errors: [{ message: 'Event ID is required' }] }
    }

    await prisma.event.delete({
      where: {
        id,
      },
    })
    revalidatePath('/dashboard/events')
    return { errors: null }
  } catch (error) {
    return { errors: [{ message: 'An unexpected error occurred. Could not delete event.' }] }
  }
}
