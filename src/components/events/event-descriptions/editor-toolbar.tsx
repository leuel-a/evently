'use client'

import { cn } from '@/lib/utils'
import * as React from 'react'
import { EditorToolbarButton } from './editor-toolbar-button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

// Icons
import { FaBold, FaUnderline, FaItalic } from 'react-icons/fa'

export default function EditorToolbar() {
  return (
    <ToggleGroup className="flex flex-wrap justify-start gap-2" size="sm" type="multiple">
      <ToggleGroupItem value="bold" className={cn('border-none p-0')}>
        <EditorToolbarButton Icon={FaBold} />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" className={cn('border-none p-0')}>
        <EditorToolbarButton Icon={FaItalic} />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" className={`border-none p-0`}>
        <EditorToolbarButton Icon={FaUnderline} />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
