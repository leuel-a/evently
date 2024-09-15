'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Header() {
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <header className="flex px-4 py-4 xl:px-0">
      <h1 className="select-none text-3xl font-semibold">evently</h1>

      {expanded && (
        <div
          onClick={() => setExpanded((prev) => !prev)}
          className="fixed bottom-0 left-0 right-0 top-0 z-10 bg-black/30"
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
            'fixed bottom-0 right-0 top-0 z-20 flex flex-col gap-20 bg-white px-8 py-28 transition-transform duration-500 ease-out md:static md:flex-row md:items-center md:justify-between md:py-0',
            expanded ? 'translate-x-0 left-1/3' : 'translate-x-full',
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

          <div className="flex flex-col gap-4 md:flex-row md:justify-between">
            <li className="flex-grow">
              <Button
                asChild
                className="w-full bg-brunswick-green hover:bg-brunswick-green/90"
              >
                <Link onClick={() => setExpanded(false)} href="/auth/login">
                  Login
                </Link>
              </Button>
            </li>
            <li className="flex-grow">
              <Button
                asChild
                variant="outline"
                className="w-full border border-rich-green"
              >
                <Link onClick={() => setExpanded(false)} href="/auth/signup">
                  Sign Up
                </Link>
              </Button>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
