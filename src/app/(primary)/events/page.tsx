'use client'

import { Event } from '@/types/event'
import { getEvents } from '@/utils/api'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useQuery, useQueryClient } from '@tanstack/react-query'

// components
import { EventGrid } from '@/components/events/event-grid'
import { EventFilters } from '@/components/events/event-filters'
import { EventPagination } from '@/components/events/event-pagination'

export default function Page({ params: { search } }: { params: { search: string } }) {
  const queryClient = useQueryClient()
  const searchParams = useSearchParams()
  const [count, setCount] = useState<number>()
  const [events, setEvents] = useState<Event[] | undefined>(undefined)

  const { error, data, isLoading } = useQuery({
    queryKey: ['getEvents', searchParams.toString()],
    queryFn: () => getEvents(searchParams.toString()),
  })

  useEffect(() => {
    if (data) {
      setEvents(data.events)
      setCount(data.count)
    }
  }, [data])

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['getEvents', searchParams.toString()] })
  }, [searchParams])
  return (
    <div className="mx-auto mt-5 max-w-container space-y-4 px-5">
      <EventFilters />
      <EventGrid isLoading={isLoading} error={error} events={events} />
      <EventPagination count={count || 0} />
    </div>
  )
}
