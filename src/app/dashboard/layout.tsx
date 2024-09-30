import { LayoutDashboard } from 'lucide-react'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { PropsWithChildren } from 'react'

export default function DashboardLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="flex">
      <DashboardSidebar />
      {children}
    </div>
  )
}
