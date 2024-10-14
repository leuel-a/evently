import { Button } from '@/components/ui/button'
import Link from 'next/link'

export interface SignInButtonProps {
  setExpanded: (value: boolean) => void
}

export const SignInButton = ({ setExpanded }: SignInButtonProps) => {
  return (
    <Button
      asChild
      className="h-10 w-full border bg-gradient-to-r from-indigo-800 to-indigo-600 text-center text-white md:w-28"
    >
      <Link onClick={() => setExpanded(false)} href="/auth/login">
        Sign In
      </Link>
    </Button>
  )
}
