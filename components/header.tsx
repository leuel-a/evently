'use client';

import * as React from 'react'
import { Menu } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Link } from '@/components/blocks/link';
import { Button } from '@/components/ui/button'

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> { }

export default function Header(props: HeaderProps) {
	const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(false);

	const handleSidebarLinkClick = () => setIsSidebarOpen(false);

	return (
		<header
			className="flex justify-between bg-indigo-500 h-24 md:h-22 p-4 px-8"
			{...props}
		>
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
			<div className="hidden md:flex md:items-center md:gap-4">
				<Button asChild className="border border-white">
					<Link href="/auth/signup">Register</Link>
				</Button>
				{/** TODO: add navigation when the pages are added */}
				<Button className="border border-white">Login</Button>
				<Button className="border border-white">Are Your an Organizer?</Button>
			</div>

			<div className="md:hidden">
				<button
					className="absolute right-6 top-8 z-10"
					onClick={() => setIsSidebarOpen(prev => !prev)}
				>
					<Menu className="text-white" size="28px" />
				</button>
				<ul
					className={cn(
						`flex flex-col gap-4 bg-white/30 backdrop-blur-sm fixed inset-y-0 right-0 w-4/6 transform transition-transform duration-600 ease-in-out pt-40 pl-10`,
						isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
					)}
				>
					<li>
						<Link
							href="/auth/signup"
							className="text-indigo-500"
							onClick={handleSidebarLinkClick}
						>
							Register
						</Link>
					</li>
					<li>
						<Link
							href="#"
							className="text-indigo-500"
							onClick={handleSidebarLinkClick}
						>
							Login
						</Link>
					</li>
					<li>
						<Link
							href="#"
							className="text-indigo-500"
							onClick={handleSidebarLinkClick}
						>
							Are Your an Organizer?
						</Link>
					</li>
				</ul>

			</div>
		</header>
	);
}
