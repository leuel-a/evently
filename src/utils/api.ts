import prisma from '@/lib/db'

export interface HttpGetEventsPayload {
  search?: string
  categories?: string
}

export const getEvents = async ({}: HttpGetEventsPayload) => {
  try {
    const events = await prisma.event.findMany({
      where: {
        description: {
        }
      }
    })
  } catch (error) {}
}