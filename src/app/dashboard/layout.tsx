import React from 'react'

// components
import SideNavbar from '@/components/dashboard/side-navbar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <SideNavbar />
      {children}
    </div>
  )
}
