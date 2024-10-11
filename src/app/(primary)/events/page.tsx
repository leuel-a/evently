import { getEvents } from '@/app/(primary)/actions'

// components
import { EventCard } from '@/components/event-card'
import { EventFilters } from '@/components/events/event-filters'
import { EventPagination } from '@/components/events/event-pagination'

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ searchParams }: PageProps) {
  const { errors, data: events } = await getEvents()
  if (errors) {
    return null
  }

  return (
    <div className="mx-auto mt-5 max-w-container px-5 space-y-4">
      <EventFilters />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events && events.map((event) => <EventCard event={event} key={event.id} />)}
      </div>
      <EventPagination />
    </div>
  )
}
