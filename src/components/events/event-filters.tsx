import { SearchInput } from '@/components/events/search-input'
import { SelectCategory } from '@/components/events/select-category'
import { TimeFilterList } from '@/components/events/time-filter-list'

export const EventFilters = () => {
  return (
    <div className="mb-4 flex w-full flex-col items-center justify-between gap-2 md:flex-row">
      <SearchInput />
      <div className="flex w-full justify-center gap-2 md:w-fit md:justify-end">
        <TimeFilterList />
        <SelectCategory />
      </div>
    </div>
  )
}
