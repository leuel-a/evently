import { Event } from '@/types/event';

interface CardProps {
  event: Event;
}

export default function Card({ event: { title, description } }: CardProps) {
  return (
    <div className="flex rounded-sm h-full gap-4 flex-col border border-brunswick-green px-2 py-2">
      <h4 className="text-xl lg:text-2xl">{title}</h4>
      <p className="text-gray-500 text-xs lg:text-sm">{description}</p>
    </div>
  );
}
