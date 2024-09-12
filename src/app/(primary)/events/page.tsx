import Card from '@/components/card';
import { sampleEvents } from '@/app/(primary)/events/data';

export default function Page() {
  return (
    <div className="px-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {sampleEvents.map((event) => (
          <Card event={event} />
        ))}
      </div>
    </div>
  );
}
