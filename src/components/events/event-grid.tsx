'use client'

import { useEffect } from 'react'
import { getEvents } from '@/utils/api'
import { useSearchParams } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query'

// components
import { EventCard } from '@/components/event-card'
import { Skeleton } from '@/components/ui/skeleton'

export const EventGrid = () => {
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const {
    error,
    data: events,
    isLoading,
  } = useQuery({
    queryKey: ['getEvents'],
    queryFn: () => getEvents(searchParams.toString()),
  })

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['getEvents'], exact: true })
  }, [searchParams])

  if (error) {
    return null
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {isLoading && Array.from({ length: 6 }).map((_, index) => <EventSkeleton key={index} />)}
      {events && events.map((event) => <EventCard key={event.id} event={event} />)}
    </div>
  )
}

const EventSkeleton = () => (
  <Skeleton className="flex h-64 w-96 flex-col justify-between gap-8 rounded-sm px-4 py-6">
    <div className="space-y-4">
      <Skeleton className="h-8 w-full border" />
      <Skeleton className="h-20 w-full border" />
    </div>
  </Skeleton>
)