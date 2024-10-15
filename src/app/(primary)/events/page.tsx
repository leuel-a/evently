import { getEvents } from '@/app/(primary)/actions'

// components
import { EventGrid } from '@/components/events/event-grid'
import { EventFilters } from '@/components/events/event-filters'
import { EventPagination } from '@/components/events/event-pagination'


export default async function Page({ params: { search } }: { params: { search: string } }) {
  return (
    <div className="mx-auto mt-5 max-w-container space-y-4 px-5">
      <EventFilters />
      <EventGrid/>
      <EventPagination />
    </div>
  )
}
