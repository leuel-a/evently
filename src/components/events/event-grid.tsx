import { EventCard } from '@/components/event-card'
import { getEvents } from '@/app/(primary)/actions'

export const EventGrid = async () => {
  const { errors, data: events } = await getEvents()
  if (errors) {
    return null
  }
  
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events && events.map((event) => <EventCard event={event} key={event.id} />)}
    </div>
  )
}
