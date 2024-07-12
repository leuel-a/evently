import Link from 'next/link'
import SignUpForm from '../components/signup-form'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

export default function SignUp() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <SignUpForm />
      <Separator className="max-w-[600px]" />
      <p className="text-md max-w-[600px]">
        Already have an account?{' '}
        <Link href="/auth" className="font-semibold text-blue-500">
          {' '}
          Sign In
        </Link>
      </p>
      <div className="flex flex-col gap-4 min-w-[600px]">
        <Button
          variant={'outline'}
          className="w-full flex items-center justify-center gap-2 text-md h-12"
        >
          <FcGoogle size={24} /> Sign Up with Google
        </Button>
        <Button className="w-full h-12 text-md flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500">
          <FaFacebook size={24} />
          Sign Up with Facebook
        </Button>
        <Button className="w-full h-12 text-md flex items-center justify-center gap-2">
          <FaXTwitter size={24} />
          Sign Up with X
        </Button>
      </div>
    </div>
  )
}
