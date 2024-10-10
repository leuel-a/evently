import Image from 'next/image'
import { signIn } from '@/auth'
import googleIcon from '@/app/assets/images/google-icon.svg'

export async function GoogleSignIn() {
  return (
    <form
      action={async () => {
        'use server'

        const response = await signIn('google', {
          redirectTo: '/',
        })

        console.log(response)
      }}
      className="w-full"
    >
      <button
        className="flex h-12 w-full items-center justify-center gap-4 rounded border border-gray-300 py-2"
        type="submit"
      >
        <span className="text-[1rem]">Sign in with Google</span>
        <Image src={googleIcon} alt="google icon" width={20} height={20} />
      </button>
    </form>
  )
}
