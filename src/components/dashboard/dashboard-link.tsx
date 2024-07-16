'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { IconType } from 'react-icons'
import { LucideIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

export type DashboardLinkProps = {
  name: string
  to: string
  children?: React.ReactNode
}

export const match = (pathname: string, to: string) => {
  if (pathname === to) return true

  // /dashboard/events/create --> /dashboard/events
  const parentPathnamePart = pathname.split('/').filter(Boolean)
  return `/${parentPathnamePart.slice(0, 2).join('/')}` === to
}

const DashboardLink = ({ name, children, to }: DashboardLinkProps) => {
  // this hook will give use the pathname of the current route
  // what if there is a child route
  const pathname = usePathname()

  return (
    <Link href={to}>
      <li
        className={cn(
          `flex items-center gap-2 rounded-md border border-transparent px-2 py-3 text-sm hover:border hover:border-gray-300 hover:bg-gray-100 hover:font-semibold`,
          match(pathname, to) && 'border border-gray-300 font-semibold'
        )}
      >
        {children}
        {name}
      </li>
    </Link>
  )
}

export default DashboardLink
