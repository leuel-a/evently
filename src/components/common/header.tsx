'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import UserButton from '@/components/user-button'


export default function Header() {
  const [expanded, setExpanded] = useState<boolean>(false)

  const session = useSession()
  const user = session?.data?.user

  return (
    <header className="flex px-4 py-4 xl:px-0">
      <h1 className="select-none text-3xl font-semibold">evently</h1>

      {expanded && (
        <div
          onClick={() => setExpanded((prev) => !prev)}
          className="fixed bottom-0 left-0 right-0 top-0 z-10 bg-black/30 md:hidden"
        ></div>
      )}

      <button
        onClick={() => setExpanded((prev) => !prev)}
        className={cn(
          'absolute right-4 top-4 z-50 aspect-square w-8 bg-cover bg-center bg-no-repeat md:hidden',
          !expanded ? 'bg-menu-burger' : 'bg-menu-close',
        )}
      ></button>

      <nav className="flex-1">
        <ul
          className={cn(
            'fixed bottom-0 left-1/3 right-0 top-0 z-20 flex flex-col gap-20 bg-white px-8 py-28 transition-transform duration-500 ease-out md:static md:translate-x-0 md:flex-row md:items-center md:justify-between md:py-0',
            expanded ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <div className="flex flex-col gap-6 md:flex-row">
            <li>
              <Link onClick={() => setExpanded(false)} href="/">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={() => setExpanded(false)} href="/events">
                Events
              </Link>
            </li>
          </div>
          <div>
            <li>
              {user && (
                <div>
                  <div className="space-y-2 md:hidden">
                    <Button className="w-full" variant="default" asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </Button>
                    <Button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      variant="outline"
                      className="w-full"
                    >
                      Sign Out
                    </Button>
                  </div>

                  <div className="hidden md:block">
                    <UserButton user={user} />
                  </div>
                </div>
              )}
              {!user && session.status !== 'loading' && (
                <Button
                  asChild
                  className="w-full border border-rich-green bg-brunswick-green text-white hover:bg-brunswick-green/90"
                >
                  <Link onClick={() => setExpanded(false)} href="/auth/login">
                    Sign In
                  </Link>
                </Button>
              )}
            </li>
          </div>
        </ul>
      </nav>
    </header>
  )
}
