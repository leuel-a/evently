import * as React from 'react'
export type AuthenticatedLayoutProps = Readonly<{ children: React.ReactNode }>

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return <React.Fragment>{children}</React.Fragment>
}
