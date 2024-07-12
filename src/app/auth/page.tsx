import Link from 'next/link'

import LoginForm from './components/login-form'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

export default function Auth() {
  return (
    <div className="flex flex-col gap-10 items-center justify-center">
      <h1 className="text-6xl font-sans">eVently</h1>
      <LoginForm />
      <Separator className="max-w-[600px]" />
      <p className="text-md max-w-[600px]">
        Don't have an account?{' '}
        <Link href="/auth/signup" className="font-semibold text-blue-500">
          {' '}
          Sign Up
        </Link>
      </p>
      <div className="min-w-[600px] space-y-2">
        <Button
          variant="outline"
          className="w-full h-12 text-md flex items-center justify-center gap-2"
        >
          <FcGoogle size={24} />
          Sign In with Google
        </Button>
        <Button className="bg-blue-500 w-full h-12 text-md flex items-center justify-center gap-2">
          <FaFacebook size={24} />
          Sign In with Facebook
        </Button>
        <Button className="w-full h-12 text-md text-white flex items-center justify-center gap-2">
          <FaXTwitter size={24} />
          Sign In with X
        </Button>
      </div>
    </div>
  )
}
