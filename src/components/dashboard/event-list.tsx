import Link from 'next/link'
import { Event } from '@/types/event'

// icons
import { Button } from '@/components/ui/button'
import { Edit, Trash } from 'lucide-react'

export interface EventListProps {
  events: Event[]
}

export const EventList = ({ events }: EventListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {events.map((event) => (
        <EventListItem key={event.id} event={event} />
      ))}
    </div>
  )
}

export interface EventListItemProps {
  event: Event
}

export const EventListItem = ({ event: { title, description, id } }: EventListItemProps) => {
  return (
    <div className="flex justify-between rounded-md border p-2 md:p-4 shadow-sm">
      <div className="space-y-2">
        <h2 className="text-[min(10vw,3vw,1.5rem)] font-medium">{title}</h2>
        <p className="line-clamp-1 max-w-[100ch] text-xs text-gray-500 md:line-clamp-2 md:text-sm">
          {description}
        </p>
      </div>
      <div className="flex flex-col md:flex-row">
        <Button className="w-14" asChild variant="ghost">
          <Link href={`/dashboard/events/${id}`}>
            <Edit />
          </Link>
        </Button>
        {/*TODO: implement the delete functionality*/}
        <Button className="w-14" variant="ghost">
          <Trash />
        </Button>
      </div>
    </div>
  )
}
