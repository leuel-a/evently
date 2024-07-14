import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Calendar, LayoutDashboardIcon, LucideIcon, Settings } from 'lucide-react'
import { DashboardLink } from './dashboard-link'

export default function SideNavbar() {
  return (
    <div className="w-72 px-2">
      <div className="mt-2 flex items-center justify-between">
        <h1>Evently</h1>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <ul className="text-md">
        <DashboardLink name="Dashboard" to="/" Icon={LayoutDashboardIcon} />
        <DashboardLink name="Events" to="/events" Icon={Calendar} />
        <DashboardLink name="Settings" to="/settings" Icon={Settings} />
      </ul>
    </div>
  )
}
