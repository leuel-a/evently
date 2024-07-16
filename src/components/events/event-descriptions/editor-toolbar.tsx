'use client'

import { cn } from '@/lib/utils'
import * as React from 'react'
import { Editor } from '@tiptap/react'
import { useCurrentEditor } from '@tiptap/react'
import { Separator } from '@/components/ui/separator'
import { EditorToolbarButton } from './editor-toolbar-button'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

// Icons
import { FaBold, FaUnderline, FaItalic } from 'react-icons/fa'

interface EditorToolbarProps {
  editor: Editor
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  return (
    <ToggleGroup
      className="sticky flex flex-wrap items-center justify-start rounded-sm border"
      size="sm"
      type="multiple"
    >
      <ToggleGroupItem value="bold" className={cn('border-none p-0')}>
        <EditorToolbarButton
          className={`${editor.isActive('bold') ? 'bg-indigo-700 text-white hover:bg-indigo-500 hover:text-white' : ''} `}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          Icon={FaBold}
        />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" className={cn(`border-none p-0`)}>
        <EditorToolbarButton
          className={`${editor.isActive('italic') ? 'bg-indigo-700 text-white hover:bg-indigo-500 hover:text-white' : ''} `}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          Icon={FaItalic}
        />
      </ToggleGroupItem>
      <ToggleGroupItem value="underline" className={`border-none p-0`}>
        <EditorToolbarButton
          className={`${editor.isActive('underline') ? 'bg-indigo-700 text-white hover:bg-indigo-500 hover:text-white' : ''} `}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          Icon={FaUnderline}
        />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
