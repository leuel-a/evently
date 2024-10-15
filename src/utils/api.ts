import axios from 'axios'
import { Event } from '@/types/event'

export const getEvents = async (searchParams: string) => {
  try {
    const response = await axios.get<Event[]>(`/api/events?${searchParams}`)
    return response.data
  } catch (error) {
    return null
  }
}