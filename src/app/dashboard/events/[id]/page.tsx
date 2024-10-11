import Link from 'next/link'
import prisma from '@/lib/db'
import { redirect } from 'next/navigation'
import { EventForm } from '@/components/dashboard/edit-event-form'

//region components and icons 
import { Button } from '@/components/ui/button'
import { RiArrowGoBackLine } from 'react-icons/ri'

//endregion

interface PageProps {
  params: {
    id: string
  }
}

export default async function Page({ params: { id } }: PageProps) {
  const event = await prisma.event.findUnique({
    where: {
      id: parseInt(id),
    },
  })
  
  if (event === null) {
    redirect('/dashboard/events')
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <Button variant="ghost" asChild className="rounded-md border border-slate-800 p-2">
          <Link href="/dashboard/events">
            <RiArrowGoBackLine size={18} className="aspect-square" />
          </Link>
        </Button>
        <h1 className="text-2xl font-medium">{event.title}</h1>
      </div>
      <EventForm event={event} />
    </>
  )
}
