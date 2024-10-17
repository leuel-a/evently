'use client'

import { useSearchParams } from 'next/navigation'

// components
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export interface EventPaginationProps {
  count: number
}

export const EventPagination = ({ count }: EventPaginationProps) => {
  const searchParams = useSearchParams()

  // limit=undefined
  const limit = Number(searchParams.get('limit')) || 6
  const page = Number(searchParams.get('page')) || 1

  const totalPages = Math.ceil(count / limit)

  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set('page', String(page))

    return `/events?${newParams.toString()}`
  }

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious href={goToPage(page - 1)} />
          </PaginationItem>
        )}
        {Array.from({ length: 3 }).map((_, index) => {
          const currPage = index - page + 2
          if (currPage < 1 || currPage > page) {
            return null
          }

          return (
            <PaginationItem key={index}>
              <PaginationLink href={goToPage(currPage)} isActive={currPage === page}>
                {currPage}
              </PaginationLink>
            </PaginationItem>
          )
        })}
        {page < totalPages && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href={goToPage(page + 1)} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  )
}
