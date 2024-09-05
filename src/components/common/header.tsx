'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { useMobile } from '@/hooks/useMobile';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Header() {
  const { isMobile } = useMobile();
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <header className="flex px-4 py-4">
      <div>
        <h1 className="text-3xl font-semibold">evently</h1>
      </div>

      {isMobile && expanded && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-10 bg-black/30"></div>
      )}

      <button
        onClick={() => setExpanded((prev) => !prev)}
        className={cn(
          'absolute right-4 top-4 z-50 aspect-square w-8 bg-cover bg-center bg-no-repeat md:hidden',
          isMobile && !expanded && 'bg-menu-burger',
          isMobile && expanded && 'bg-menu-close',
        )}
      ></button>

      <nav className="flex-1">
        <ul
          className={cn(
            'fixed bottom-0 left-1/3 right-0 top-0 z-20 flex flex-col gap-20 bg-white px-8 py-28 md:static md:flex-row md:items-center md:justify-between md:py-0',
            isMobile && 'transition-transform duration-500 ease-out',
            isMobile && !expanded && 'translate-x-full',
            isMobile && expanded && 'translate-x-0',
          )}
        >
          <div className="flex flex-col gap-6 md:flex-row">
            <li>Home</li>
            <li>Events</li>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:justify-between">
            <li className="flex-grow">
              <Button className="w-full bg-brunswick-green hover:bg-brunswick-green/90">
                Login
              </Button>
            </li>
            <li className="flex-grow">
              <Button
                variant="outline"
                className="w-full border border-rich-green"
              >
                Sign Up
              </Button>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
