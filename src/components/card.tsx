import { Event } from '@/types/event';

import { formatDate } from '@/lib/utils';

interface CardProps {
  event: Event;
}

export default function Card({
  event: { title, description, location, category, startTime, endTime, date },
}: CardProps) {
  return (
    <div className="flex flex-col justify-between rounded-md border border-brunswick-green px-2 py-4">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div>
        <div className="font-barlow-cond mb-1 mt-6 flex items-center justify-between text-lg">
          <p>{formatDate(date)}</p>
          <p>
            {startTime} - {endTime}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{location}</span>
          <span className="rounded-md border border-brunswick-green px-2 py-1 text-xs font-semibold text-brunswick-green">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
}
