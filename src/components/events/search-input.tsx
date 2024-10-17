'use client'

import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import { useRouter, useSearchParams } from 'next/navigation'

export const SearchInput = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [search, setSearch] = useState<string>('')
  const debouncedSearch = useDebounce(search)

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('search', debouncedSearch)

    router.push(`/events?${params.toString()}`)
  }, [debouncedSearch])

  return (
    <div className="flex w-full justify-center gap-2 md:justify-start">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-96 h-12"
        placeholder="Search Events..."
      />
    </div>
  )
}
