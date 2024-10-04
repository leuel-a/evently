import { type VariantProps } from 'class-variance-authority'
import { Button, buttonVariants } from '@/components/ui/button'
import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

type SubmitButtonProps = PropsWithChildren &
  ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

export const SubmitButton = ({ children, ...props }: SubmitButtonProps) => {
  return <Button {...props}>{children}</Button>
}
