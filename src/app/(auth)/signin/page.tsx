import * as React from 'react'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import { getProviders, signIn } from 'next-auth/react'

export const metadata: Metadata = {
  title: 'Evently - Sign In'
}

export default async function Page() {
  const providers = await getProviders()

  return (
    <div className="flex h-full items-center justify-center">
      <div>
        <Button variant="outline" className="h-12 w-96 text-md flex items-center justify-center gap-4">
          <FcGoogle size={32} />
          Sign In with Google
        </Button>
      </div>
    </div>
  )
}
