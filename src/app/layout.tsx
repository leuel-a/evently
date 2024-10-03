import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from '@/components/ui/toaster';
import './globals.css'

export const metadata: Metadata = {
  title: 'Evently',
  description: 'A very effective and simple event listing application.',
}

const barlow = localFont({
  src: [
    {
      path: './assets/fonts/barlow/Barlow-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './assets/fonts/barlow/Barlow-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './assets/fonts/barlow/Barlow-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './assets/fonts/barlow/Barlow-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--ff-barlow',
})

const barlowCond = localFont({
  src: [
    {
      path: './assets/fonts/barlow/Barlow-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './assets/fonts/barlow/Barlow-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './assets/fonts/barlow/Barlow-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './assets/fonts/barlow/Barlow-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--ff-barlow-cond',
})

const epilogue = localFont({
  src: './assets/fonts/epilogue/Epilogue-VariableFont_wght.ttf',
  variable: '--ff-epilogue',
})

const dmSans = localFont({
  src: [
    {
      path: './assets/fonts/dm_sans/DMSans.ttf',
      style: 'normal',
    },
    {
      path: './assets/fonts/dm_sans/DMSans-Italic.ttf',
      style: 'normal',
    },
  ],
  variable: '--ff-dm-sans',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${barlow.variable} ${epilogue.variable} ${barlowCond.variable} ${dmSans.variable} h-screen bg-white font-epilogue text-indigo-900`}
      >
        <SessionProvider>{children}</SessionProvider>
        <Toaster />
      </body>
    </html>
  )
}
