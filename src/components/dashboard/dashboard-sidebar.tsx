'use client'

import { usePathname } from 'next/navigation'
import { Sidebar, SidebarItem } from './sidebar'
import { LayoutDashboard, Calendar } from 'lucide-react'

export const DashboardSidebar = () => {
  const pathname = usePathname()
  return (
    <Sidebar>
      <SidebarItem
        href="/dashboard"
        active={pathname === '/dashboard'}
        icon={<LayoutDashboard />}
        text="Dashboard"
      />
      <SidebarItem
        href="/dashboard/events"
        active={/^\/dashboard\/events(\/.*)?/.test(pathname)}
        icon={<Calendar />}
        text="Events"
        alert
      />
    </Sidebar>
  )
}
