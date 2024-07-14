import Link from 'next/link'
import { Button } from '@/components/ui/button'
import SignInButton from '../navbar/SignInButton'

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center justify-center gap-10">
        <h1 className="text-xl font-semibold">Event Finder</h1>
        <ul className="flex items-center justify-evenly gap-4">
          <li>
            <Link className="cursor-pointer" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="cursor-pointer" href="/events">
              Events
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <SignInButton>SignIn</SignInButton>
      </div>
    </nav>
  )
}
