import Link from 'next/link'
import { auth } from '@/auth'
import { getEvents } from '@/app/dashboard/actions'

// components
import { Button } from '@/components/ui/button'
import { EventList } from '@/components/dashboard/event-list'

export default async function Page() {
  const session = await auth()
  const user = session?.user
  const userEmail = user?.email === null ? undefined : user?.email

  const { data: events, errors } = await getEvents(userEmail)
  if (errors) {
    return <div>{errors[0].message}</div>
  }

  return (
    <>
      <div className="mb-6 flex flex-row items-center justify-between">
        <h1 className="text-2xl font-semibold">Events</h1>
        <Button asChild>
          <Link href="/dashboard/events/new">Create Event</Link>
        </Button>
      </div>
      <EventList events={events ?? []} />
    </>
  )
}
