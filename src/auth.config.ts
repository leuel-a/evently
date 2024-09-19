import prisma from '@/lib/db'
import Google from 'next-auth/providers/google'
import { type NextAuthConfig } from 'next-auth'
import { comparePassword } from '@/utils/password'
import Credentials from 'next-auth/providers/credentials'

export default {
  providers: [
    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials

        const user = await prisma.user.findUnique({
          where: {
            email: email as string,
          },
        })

        if (!user) {
          return null
        }
        const isValid = await comparePassword(password as string, user.password)

        if (isValid) {
          console.log('Is a valid password hence')
          return user
        }

        console.log('Is not a valid password hence')
        return null
      },
    }),
  ],
  debug: true,
  callbacks: {},
  pages: {
    error: '/auth/error',
  },
} satisfies NextAuthConfig
