import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function Page() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-semibold">Events</h1>
        <Button asChild>
          <Link href="/dashboard/events/new">Create Event</Link>
        </Button>
      </div>
      {/* Data Table for the Events of the user */}
    </div>
  )
}
