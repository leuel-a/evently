import Link from 'next/link'
import { signOut } from 'next-auth/react'

// components
import { User } from 'next-auth'
import { UserButton } from '@/components/user-button'
import { Button } from '@/components/ui/button'

interface UserMenuProps {
  user?: User
}

export const UserMenu = ({ user }: UserMenuProps) => {
  if (!user) {
    return null
  } 
  
  return (
    <>
      {user && (
        <div>
          {/* Mobile View */}
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

          {/* Desktop View */}
          <div className="hidden md:block">
            <UserButton user={user} />
          </div>
        </div>
      )}
    </>
  )
}
