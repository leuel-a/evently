'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { IconType } from 'react-icons'
import { Button } from '@/components/ui/button'
import { useCurrentEditor, useEditor } from '@tiptap/react'

export type EditorToolbarButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  Icon: IconType
}

export function EditorToolbarButton({ Icon, className, ...props }: EditorToolbarButtonProps) {
  return (
    <Button
      variant="outline"
      className={cn('h-full rounded-none border border-transparent', className)}
      type="button"
      {...props}
    >
      <Icon />
    </Button>
  )
}
