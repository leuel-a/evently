import Image from 'next/image'
import { ChevronFirst, ChevronLast, Link, MoreVertical } from 'lucide-react'
import {
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  useState,
} from 'react'
import { useSidebarContext, SidebarContext } from '@/app/dashboard/context'
import avatarPlaceholder from '@/app/assets/images/avatar_placeholder.png'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'

export interface SidebarProps extends PropsWithChildren {}

export const Sidebar = ({ children }: SidebarProps) => {
  const [expanded, setExpanded] = useState(true)

  return (
    <aside className="h-screen">
      <nav className="flex h-full flex-col border-r bg-white shadow-sm">
        <div className="flex items-center justify-between p-4 pb-2">
          <h1
            className={cn(
              'overflow-hidden text-2xl font-semibold transition-all',
              expanded ? 'w-32' : 'w-0',
            )}
          >
            evently
          </h1>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="rounded-lg bg-gray-50 p-1.5 hover:bg-gray-100"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="flex border-t p-3">
          <Image src={avatarPlaceholder} alt="" className="h-10 w-10 rounded-md" />
          <div
            className={`flex items-center justify-between overflow-hidden transition-all ${expanded ? 'ml-3 w-52' : 'w-0'} `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  )
}

export interface SidebarItemProps {
  active: boolean
  icon: ReactNode
  text: string
  alert?: boolean
  href: string
}

export const SidebarItem = ({ active, icon, alert, text, href }: SidebarItemProps) => {
  const router = useRouter()
  const { expanded } = useSidebarContext()
  return (
    <li
      onClick={() => router.push(href)}
      className={`group relative my-1 flex cursor-pointer items-center rounded-md px-3 py-2 font-medium transition-colors ${
        active
          ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
          : 'text-gray-600 hover:bg-indigo-50'
      } `}
    >
      {icon}
      <span className={`overflow-hidden transition-all ${expanded ? 'ml-3 w-52' : 'w-0'}`}>
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 h-2 w-2 rounded bg-indigo-400 ${expanded ? '' : 'top-2'}`}
        />
      )}

      {!expanded && (
        <div
          className={`invisible absolute left-full ml-6 -translate-x-3 rounded-md bg-indigo-100 px-2 py-1 text-sm text-indigo-800 opacity-20 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100`}
        >
          {text}
        </div>
      )}
    </li>
  )
}
