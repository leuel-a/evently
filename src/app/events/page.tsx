import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Page() {
  return (
    <main className="mt-4 flex items-center justify-between">
      <h1>Events</h1>
      <div>
        <Button className="w-48 rounded-none" asChild>
          <Link href="/events/create">Create Event</Link>
        </Button>
      </div>
    </main>
  )
}
