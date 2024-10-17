import axios from 'axios'
import { Event } from '@/types/event'

type GetEventsResponse = {
  events: Event[]
  count: number
}

export const getEvents = async (searchParams: string) => {
  try {
    const response = await axios.get<GetEventsResponse>(`/api/events?${searchParams}`)
    return response.data
  } catch (error) {
    return null
  }
}