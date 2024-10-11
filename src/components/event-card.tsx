import { format } from 'date-fns'
import { Event } from '@/types/event';
import { Badge } from '@/components/ui/badge'

// components and icons
import { Calendar } from 'lucide-react'
import { CiCalendar, CiClock1 } from 'react-icons/ci'

export interface EventCardProps {
  event: Event
}

export const EventCard = ({
  event: { title, description, date, startTime, endTime, location, virtual },
}: EventCardProps) => {
  return (
    <div className="flex flex-col justify-between gap-8 rounded-sm border px-4 py-6 shadow-sm">
      <div className="space-y-4">
        <h4 className="text-lg font-medium lg:text-2xl">{title}</h4>
        <p className="line-clamp-3 text-sm text-gray-500">{description}</p>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-gray-500">
          <div className="flex items-end gap-1">
            <CiCalendar size={22} />
            <div className="flex items-end">
              <p className="text-sm">{format(date, 'PPP')}</p>
            </div>
          </div>
          <div className="flex items-end gap-1">
            <CiClock1 size={22} />
            <div className="flex items-end">
              <p className="text-sm">
                {startTime} - {endTime}
              </p>
            </div>
          </div>
        </div>
        {virtual && <Badge className="ml-auto w-fit">Virtual</Badge>}
      </div>
    </div>
  )
}
