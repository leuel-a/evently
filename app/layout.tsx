import localFont from 'next/font/local'
import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
  title: 'Evently',
  description: 'Discover events like never before',
}

const poppins = localFont({
  src: [
    {
      path: '../assets/fonts/poppins/Poppins-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-poppins',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
