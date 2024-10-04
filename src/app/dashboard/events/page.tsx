import Link from 'next/link'
import { auth } from '@/auth'
import prisma from '@/lib/db'

// components
import { Button } from '@/components/ui/button'
import { EventList } from '@/components/dashboard/event-list'

export default async function Page() {
  const session = await auth()
  const user = session?.user

  const events = await prisma.event.findMany({ where: { createdBy: user?.email as string } })
  return (
    <>
      <div className="flex flex-row items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Events</h1>
        <Button asChild>
          <Link href="/dashboard/events/new">Create Event</Link>
        </Button>
      </div>
      <EventList events={events} />
    </>
  )
}
