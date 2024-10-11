'use client'

import { useState } from 'react'
import { TimeFilterListItem } from '@/components/events/time-filter-list-item'

export const TimeFilterList = () => {
  const [activeFilter, setActiveFilter] = useState<string>('All')

  return (
    <ul className="flex items-center gap-2 text-center">
      <TimeFilterListItem
        setActiveFilter={setActiveFilter}
        active={activeFilter === 'All'}
        value="All"
      />
      <TimeFilterListItem
        setActiveFilter={setActiveFilter}
        active={activeFilter === '3 Days'}
        value="3 Days"
      />
      <TimeFilterListItem
        setActiveFilter={setActiveFilter}
        active={activeFilter === 'This Week'}
        value="This Week"
      />
    </ul>
  )
}
