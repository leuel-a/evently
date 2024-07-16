import Link from 'next/link'
import { Button } from '@/components/common/Button'
import { PageTitle } from '@/components/dashboard/page-title'
import CreateEventForm from '@/components/events/create-event-form'

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <PageTitle title="Create an Event"/>
        <Button asChild>
          <Link href="/dashboard/events">Back to Events</Link>
        </Button>
      </div>
      <CreateEventForm />
    </div>
  )
}
