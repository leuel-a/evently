import { Event } from '@/types/event';
import { formatDate } from '@/lib/utils';

interface CardProps {
  event: Event;
}

export default function Card({
  event: { title, description, date, startTime, endTime, location },
}: CardProps) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-sm border border-brunswick-green px-2 py-2">
      <div>
        <h4 className="text-xl lg:text-2xl font-semibold">{title}</h4>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
      <div className="flex text-sm items-center justify-between font-barlow-cond text-gray-500">
        <p>{formatDate(date)}</p>
        <p className="">
          {startTime} - {endTime}
        </p>
      </div>
      <p className="lg:text-sm">{location}</p>
    </div>
  );
}
