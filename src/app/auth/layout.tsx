import { ReactNode } from 'react'

export default function AuthPageLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <main className="grid grid-cols-2 h-screen">
      <div className='col-span-1 bg-indigo-600 h-full'></div>
      {children}
    </main>
  )
}
