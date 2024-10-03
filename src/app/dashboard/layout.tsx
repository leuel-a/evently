import { LayoutDashboard } from 'lucide-react'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'
import { PropsWithChildren } from 'react'

export default function DashboardLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <div className="flex h-full">
      <DashboardSidebar />
      <div className="w-full px-8 py-6">
        {children}
      </div>
    </div>
  )
}
