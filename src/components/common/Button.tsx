import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button as ShadButton, ButtonProps as ShadButtonProps } from '../ui/button'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & ShadButtonProps & {}

export function Button({ children, className, variant, ...props }: ButtonProps) {
  return (
    <ShadButton
      variant={variant}
      className={cn('w-44 rounded-sm bg-indigo-700 font-semibold hover:bg-indigo-600', className)}
    >
      {children}
    </ShadButton>
  )
}
