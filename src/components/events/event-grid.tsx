import { Event } from '@/types/event'
import { EventCard } from '@/components/event-card'
import { Skeleton } from '@/components/ui/skeleton'

export interface EventGridProps {
  isLoading: boolean
  error: Error | null
  events?: Event[]
}

export const EventGrid = ({ error, isLoading, events }: EventGridProps) => {
  if (error) {
    return null
  }

  if (!isLoading && events?.length === 0) {
    return (
      <div className="flex h-[40rem] items-center justify-center">
        <h2 className="text-xl font-medium">No Events Found</h2>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {isLoading && Array.from({ length: 6 }).map((_, index) => <EventSkeleton key={index} />)}
      {!isLoading && events && events.map((event) => <EventCard key={event.id} event={event} />)}
    </div>
  )
}

const EventSkeleton = () => (
  <Skeleton className="flex h-64 w-96 flex-col justify-between gap-8 rounded-sm px-4 py-6">
    <div className="space-y-4">
      <Skeleton className="h-8 w-full border" />
      <Skeleton className="h-20 w-full border" />
    </div>
  </Skeleton>
)