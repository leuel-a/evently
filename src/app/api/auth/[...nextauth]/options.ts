import type { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
        email: { label: 'Email', type: 'email' }
      },
      async authorize(credentials) {
        const user = { id: '1', username: 'leuela', password: 'leuela' }

        if (user.username === credentials?.username && user.password === credentials?.password) {
          return user
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/signin',
  }
}
