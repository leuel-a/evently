import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import DashboardLink from './dashboard-link' // client component
import { Button } from '@/components/ui/button'
import { Calendar, LayoutDashboardIcon, Settings } from 'lucide-react'

export default function SideNavbar() {
  return (
    <div className="w-72 space-y-5">
      <Button className="w-full" variant={'outline'}>
        Evently
      </Button>
      <div className="">
        <h3 className="mb-2 text-sm font-semibold text-gray-500">Menu</h3>
        <ul className="flex flex-col gap-2">
          <DashboardLink name="Dashboard" to="/dashboard">
            <LayoutDashboardIcon size={20} />
          </DashboardLink>
          <DashboardLink name="Events" to="/dashboard/events">
            <Calendar size={20} />
          </DashboardLink>
          <DashboardLink name="Settings" to="/dashboard/settings">
            <Settings size={20} />
          </DashboardLink>
        </ul>
      </div>
    </div>
  )
}
