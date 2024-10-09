import prisma from '@/lib/db'
import { redirect } from 'next/navigation'
import { EventForm } from '@/components/dashboard/edit-event-form'

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
      <h1 className="text-2xl font-medium">{event.title}</h1>
      <EventForm event={event} />
    </>
  )
}
