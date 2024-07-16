import React from 'react'

export type PageTitleProps = {
  title: string
}

export function PageTitle({ title }: PageTitleProps) {
  return <h1 className="text-2xl font-semibold">{title}</h1>
}
