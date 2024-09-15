import Card from '@/components/card';
import { sampleEvents } from '@/app/(primary)/events/data';

export default function Page() {
  return (
    <div className="px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {sampleEvents.map((event) => (
          <Card key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
