import React from 'react'
import { Separator } from '@/components/ui/separator'

// components
import SideNavbar from '@/components/dashboard/side-navbar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="mt-4 mx-6 flex h-screen">
      <SideNavbar />
      <Separator orientation='vertical' className='mx-4'/>
      {children}
    </main>
  )
}
