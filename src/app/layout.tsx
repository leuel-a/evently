import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Evently',
  description: 'All in one place to checkout different events, and locations.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}
