'use client';

import * as React from 'react';
import { Menu } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Link } from '@/components/blocks/link';
import { Button } from '@/components/ui/button';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

export default function Header(props: HeaderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false);

  const handleSidebarLinkClick = () => setIsSidebarOpen(false);

  return (
    <header className="md:h-22 flex h-20 justify-between bg-indigo-500 p-2 px-8" {...props}>
      <div className="flex items-center justify-center gap-12">
        <h1 className="text-3xl font-extrabold text-white">Evently</h1>
        <nav className="flex flex-row items-center">
          <ul className="flex items-center gap-4">
            <li>
              <Link href="#">Home</Link>
            </li>
            <li>
              <Link href="#">Events</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="hidden md:flex md:items-center md:gap-4">
        <Button asChild className="border border-white">
          <Link href="/auth/signup">Register</Link>
        </Button>
        {/** TODO: add navigation when the pages are added */}
        <Button className="border border-white">Login</Button>
        <Button className="border border-white bg-amber-500 hover:border-amber-500 hover:bg-white hover:text-amber-500">
          Are Your an Organizer?
        </Button>
      </div>

      <div className="md:hidden">
        <button
          className="absolute right-6 top-8 z-10"
          onClick={() => setIsSidebarOpen((prev) => !prev)}
        >
          <Menu className="text-white" size="28px" />
        </button>
        <ul
          className={cn(
            `duration-600 fixed inset-y-0 right-0 flex w-4/6 transform flex-col gap-4 bg-white/30 pl-10 pt-40 backdrop-blur-sm transition-transform ease-in-out`,
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full',
          )}
        >
          <li>
            <Link href="/auth/signup" className="text-indigo-500" onClick={handleSidebarLinkClick}>
              Register
            </Link>
          </li>
          <li>
            <Link href="#" className="text-indigo-500" onClick={handleSidebarLinkClick}>
              Login
            </Link>
          </li>
          <li>
            <Link href="#" className="text-indigo-500" onClick={handleSidebarLinkClick}>
              Are Your an Organizer?
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
