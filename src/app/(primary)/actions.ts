'use server'
import prisma from '@/lib/db'
import { Event } from '@/types/event'
import { CustomErrors } from '@/utils/zod'

export const getEvents = async (): Promise<{
  errors: CustomErrors | null
  data: Event[] | null
}> => {
  try {
    const events = await prisma.event.findMany({})
    return {
      errors: null,
      data: events,
    }
  } catch (error) {
    return {
      errors: {
        message: 'An error occurred while fetching the events',
      },
      data: null,
    }
  }
}
