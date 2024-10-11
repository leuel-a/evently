'use client'

import { cn } from '@/lib/utils'

// component
import { Button } from '@/components/ui/button'

export interface TimeFilterListItemProps {
  value: string
  active: boolean
  setActiveFilter: (value: string) => void
}

export const TimeFilterListItem = ({ value, active, setActiveFilter }: TimeFilterListItemProps) => {
  const handleClick = () => {
    setActiveFilter(value)
  }
  return (
    <Button
      className="cursor-pointer hover:border hover:border-indigo-500 hover:bg-inherit"
      onClick={handleClick}
      asChild
      variant={active ? 'default' : 'outline'}
    >
      <li>{value}</li>
    </Button>
  )
}
