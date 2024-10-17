'use client';

import Link from 'next/link';
import { useState, Suspense } from 'react'
import { cn } from '@/lib/utils';
import { useSession, signOut } from 'next-auth/react'

// components and icons
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SignInButton } from '@/components/signin-button'
import { UserButton } from '@/components/user-button'
import { LayoutDashboard, Settings } from 'lucide-react'


export default function Header() {
  const [expanded, setExpanded] = useState<boolean>(false)

  const session = useSession()
  const user = session?.data?.user

  return (
    <header className="border-indigo-800 bg-indigo-700 text-white shadow-lg">
      <div className="min-w-container mx-auto flex max-w-container items-center justify-between px-4 py-4 xl:px-0">
        <Link href="/" className="select-none text-3xl font-semibold">
          evently
        </Link>

        {expanded && (
          <div
            onClick={() => setExpanded((prev) => !prev)}
            className="fixed bottom-0 left-0 right-0 top-0 z-10 md:hidden"
          ></div>
        )}

        <button
          onClick={() => setExpanded((prev) => !prev)}
          className={cn(
            'absolute right-4 top-4 z-50 aspect-square w-8 bg-cover bg-center bg-no-repeat md:hidden',
          )}
        >
          {expanded ? (
            <X size={32} className="aspect-square text-white" />
          ) : (
            <Menu size={32} className="aspect-square text-white" />
          )}
        </button>

        <nav className="font-medium">
          <ul
            className={cn(
              'fixed bottom-0 left-1/3 right-0 top-0 z-20 flex flex-col gap-20 px-8 py-28 text-white transition-transform duration-500 ease-out md:static md:translate-x-0 md:flex-row md:items-center md:justify-between md:py-0 md:text-black',
              expanded
                ? 'translate-x-0 bg-indigo-500 bg-opacity-50 backdrop-blur'
                : 'translate-x-full',
            )}
          >
            <div
              className="flex flex-col gap-6 text-white md:flex-row md:items-center"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/events">Explore Events</Link>
              </li>
              <li className="hidden md:block">
                {session.status !== 'loading' && user && <UserButton user={user} />}
              </li>
              {session.status === 'authenticated' && (
                <div className="space-y-6 md:hidden">
                  <Separator />
                  <li className="flex items-center gap-2">
                    <LayoutDashboard size={20} />
                    <Link href="/dashboard">Dashboard</Link>
                  </li>
                  <li className="flex items-center gap-2">
                    <Settings size={20} />
                    <Link href="/dashboard">Settings</Link>
                  </li>
                </div>
              )}
              {session.status === 'authenticated' && (
                <div className="md:hidden">
                  <li>
                    <Link href="/dashboard"></Link>
                  </li>
                  <li>
                    <Button
                      variant="outline"
                      className="w-full text-indigo-600 hover:text-indigo-500"
                      onClick={() => signOut({ callbackUrl: '/' })}
                    >
                      Sign Out
                    </Button>
                  </li>
                </div>
              )}
              {session.status !== 'loading' && !user && <SignInButton setExpanded={setExpanded} />}
            </div>
          </ul>
        </nav>
      </div>
    </header>
  )
}
