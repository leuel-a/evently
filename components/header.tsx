import React from 'react'
import { Button } from '@/components/ui/button'

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> { }

export const Header = () => {
	return (
		<header className="bg-indigo-500 h-22">
			<div className="flex items-center">
				<nav className="flex flex-row items-center">
					<ul className="flex items-center">
						<li>Home</li>
						<li>Events</li>
					</ul>
				</nav>
				<div className="flex items-center">
					<Button>Login</Button>
					<Button>Register</Button>
					<Button>Are Your an Organizer?</Button>
				</div>
			</div>
		</header>
	);
}
