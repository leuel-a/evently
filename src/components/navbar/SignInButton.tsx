'use client'
import { signIn } from 'next-auth/react'
import { Button } from '../ui/button'

export default function SignInButton({ children }: { children: React.ReactNode }) {
  return <Button onClick={() => signIn()}>{children}</Button>
}