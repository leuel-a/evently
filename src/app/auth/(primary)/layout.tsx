import Link from 'next/link'
import { GoogleSignIn } from '@/components/common/google-sign-in'

export default function PrimaryLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid h-full items-center">
      <div className="mx-auto w-full space-y-10 px-4 sm:w-fit sm:min-w-[35rem]">
        <div className="space-y-2 lg:text-lg">
          <Link href="/" className="text-3xl font-semibold">
            evently
          </Link>
          <p>Explore, Create. Unlock a World of Unforgettable Event</p>
        </div>

        <div className="w-full space-y-2">
          <GoogleSignIn />

          <div className="flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {children}
        </div>
      </div>
    </div>
  )
}
