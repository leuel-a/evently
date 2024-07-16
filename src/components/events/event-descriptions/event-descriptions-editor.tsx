'use client'

import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { EditorContent, EditorProvider, useEditor } from '@tiptap/react'

import EditorToolbar from './editor-toolbar'
import { ScrollArea } from '@/components/ui/scroll-area'

type EventDescriptionsEditorProps = {
  content: string
  setContent: (value: string) => void
}

export default function EventDescriptionsEditor({
  content,
  setContent
}: EventDescriptionsEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content,
    onUpdate: ({ editor }) => setContent(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose prose-sm prose-headings:m-0 prose-p:m-0 p-4 !max-w-none focus:outline-none'
      }
    }
  })

  // may be make this logic to anyone that will consume the editor
  // but this one is a simple one I think one place the whole think works like magic
  if (!editor) return null

  return (
    <>
      <EditorToolbar editor={editor} />
      <ScrollArea className="h-[250px] rounded border focus-within:ring-2 focus-within:ring-indigo-700">
        <EditorContent editor={editor} />
      </ScrollArea>{' '}
    </>
  )
}
