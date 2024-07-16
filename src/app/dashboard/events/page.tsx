import React from 'react'
import Link from 'next/link'
import { Filter } from 'lucide-react'
import { CiFilter } from 'react-icons/ci'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/common/Button'
import { Button as ShadButton } from '@/components/ui/button'
import { PageTitle } from '@/components/dashboard/page-title'

// components
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export default function Page() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <PageTitle title="My Events" />
        <Button asChild>
          <Link href="/dashboard/events/create">Create Event</Link>
        </Button>
      </div>
      <div className="mt-4 flex w-fit items-center gap-2">
        <Input
          className="h-12 w-96 focus-visible:ring-indigo-700 focus-visible:ring-offset-0"
          placeholder="Search for your events"
        />
        <Popover>
          <PopoverTrigger asChild>
            <ShadButton
              variant={'outline'}
              className="h-12 w-fit hover:bg-white hover:ring-2 hover:ring-indigo-700"
            >
              <Filter color="#4338ca" size={20} />
            </ShadButton>
          </PopoverTrigger>
        </Popover>
      </div>
    </div>
  )
}
