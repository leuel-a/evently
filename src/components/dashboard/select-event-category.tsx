import { FormControl } from '@/components/ui/form'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from '@/components/ui/select'
import { EventCategory } from '@/types/enums'

export interface SelectEventCategoryProps {
  placeholder?: string
  onChange: () => void
  value: string
}

export const SelectEventCategory = ({ placeholder, onChange, value }: SelectEventCategoryProps) => {
  const categoryEntries = Object.entries(EventCategory)
  return (
    <Select defaultValue={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select your event category" />
      </SelectTrigger>
      <SelectContent>
        {categoryEntries.map(([key, value]) => (
          <SelectItem value={key}>{value}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
