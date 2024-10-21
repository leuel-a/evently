import Link from 'next/link'

// components and icons
import { FaFacebook } from 'react-icons/fa6'
import { GrInstagram } from 'react-icons/gr'
import { RiTwitterLine } from 'react-icons/ri'

export default function Footer() {
  return (
    <footer className="flex h-auto flex-col items-center justify-evenly bg-indigo-600 py-8 text-white md:h-44 md:flex-row">
      <div className="mb-4 md:mb-0">
        <Link className="text-4xl font-semibold" href="/">
          evently
        </Link>
      </div>
      <div className="mb-4 md:mb-0">
        <ul>
          <li className="mb-2">
            <Link href="/" aria-label="Go to Home Page">
              Home
            </Link>
          </li>
          <li>
            <Link href="/events" aria-label="View Events">
              Events
            </Link>
          </li>
        </ul>
      </div>
      <div className="mb-4 md:mb-0">
        <ul>
          <li className="mb-2">
            <Link href="/about" aria-label="Learn About Us">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/contact" aria-label="Contact Us">
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="mb-4 md:mb-0">
        <p>Follow Us:</p>
        <ul className="flex space-x-4">
          <li>
            <Link href="https://facebook.com" aria-label="Follow us on Facebook">
              <FaFacebook className="h-6 w-6" />
            </Link>
          </li>
          <li>
            <Link href="https://twitter.com" aria-label="Follow us on Twitter">
              <RiTwitterLine className="h-6 w-6" />
            </Link>
          </li>
          <li>
            <Link href="https://instagram.com" aria-label="Follow us on Instagram">
              <GrInstagram className="h-6 w-6" />
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <p>&copy; {new Date().getFullYear()} Evently. All rights reserved.</p>
      </div>
    </footer>
  )
}
