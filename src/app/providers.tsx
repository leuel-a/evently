'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <>
      <SessionProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </SessionProvider>
    </>
  )
}
