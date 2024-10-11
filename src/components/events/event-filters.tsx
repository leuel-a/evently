// components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { EventCategory } from '@/types/enums'
import { TimeFilterList } from '@/components/events/time-filter-list'

export const EventFilters = () => {
  const categoryEntries = Object.entries(EventCategory)
  return (
    <div className="mb-4 flex w-full flex-col items-center justify-between gap-2 md:flex-row">
      <div className="flex w-full justify-center gap-2 md:justify-start">
        <Input className="w-96" placeholder="Search Events..." />
      </div>
      <div className="flex w-full justify-center gap-2 md:w-fit md:justify-end">
        <TimeFilterList />
        <div className="w-44">
          <Select>
            <SelectTrigger className="focus:ring-1 focus:ring-indigo-600">
              <SelectValue placeholder="Cateogries" />
            </SelectTrigger>
            <SelectContent>
              {categoryEntries.map(([key, value]) => (
                <SelectItem key={key} value={key}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
