import * as React from 'react'
import { cn } from '@/lib/utils'
import { IconType } from 'react-icons'
import { Button } from '@/components/ui/button'

export type EditorToolbarButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  Icon: IconType
}

export function EditorToolbarButton({ Icon, className, ...props }: EditorToolbarButtonProps) {
  const [selected, setSelected] = React.useState<boolean>(false)

  return (
    <Button
      variant="outline"
      className={cn(
        'border-none bg-inherit',
        className,
        selected && 'bg-gray-800 text-white hover:bg-gray-700 hover:text-white'
      )}
      type="button"
      onClick={() => setSelected(prev => !prev)}
      {...props}
    >
      <Icon />
    </Button>
  )
}
