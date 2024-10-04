import { auth } from '@/auth'
import { PropsWithChildren } from 'react'
import { redirect } from 'next/navigation'
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar'

export default async function DashboardLayout({ children }: Readonly<PropsWithChildren>) {
  const session = await auth()
  const user = session?.user

  if (!user) {
    redirect('/auth/login')
  }

  return (
    <div className="flex h-full">
      <DashboardSidebar />
      <div className="w-full px-8 py-6">{children}</div>
    </div>
  )
}
