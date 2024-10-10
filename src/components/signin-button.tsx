import { Button } from '@/components/ui/button'
import Link from 'next/link'

export interface SignInButtonProps {
  setExpanded: (value: boolean) => void
}

export const SignInButton = ({ setExpanded }: SignInButtonProps) => {
  return (
    <Button
      asChild
      className="border hidden md:block text-center h-10 w-28 bg-gradient-to-r from-indigo-800 to-indigo-600 text-white"
    >
      <Link onClick={() => setExpanded(false)} href="/auth/login">
        Sign In
      </Link>
    </Button>
  )
}
