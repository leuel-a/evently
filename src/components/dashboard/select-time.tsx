import { FormControl } from '@/components/ui/form'
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select'

export interface SelectTimeProps {
  placeholder?: string
  onChange: () => void
  value?: string
}

const times = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
]

export const SelectTime = ({ placeholder, value, onChange }: SelectTimeProps) => {
  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <FormControl>
        <SelectTrigger>
          {/*TODO: change the color of the placeholder text for this select trigger*/}
          <SelectValue
            className="placeholder:text-muted-foreground"
            placeholder={placeholder ?? 'Select a time'}
          />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {/* AM times */}
        {times.map((time) => (
          <SelectItem key={`${time} AM`} value={`${time} AM`}>{`${time} AM`}</SelectItem>
        ))}

        {/* PM times */}
        {times.map((time) => (
          <SelectItem key={`${time} PM`} value={`${time} PM`}>{`${time} PM`}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
