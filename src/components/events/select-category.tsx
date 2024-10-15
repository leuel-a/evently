'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { EventCategory } from '@/types/enums'

export const SelectCategory = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [category, setCategory] = useState<string>('')
  const categoryEntries = Object.entries(EventCategory)
  
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('category', category)

    router.push(`/events?${params}`)
  }, [category])

  return (
    <div className="w-44">
      <Select defaultValue={category} onValueChange={setCategory}>
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
  )
}
