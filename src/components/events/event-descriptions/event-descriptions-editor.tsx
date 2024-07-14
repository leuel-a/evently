'use client'

import { Extension } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Heading from '@tiptap/extension-heading'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import { useEditor, EditorContent, FloatingMenu, BubbleMenu, EditorProvider } from '@tiptap/react'
import EditorToolbar from './editor-toolbar'

type EventDescriptionsEditorProps = {
  content: string
}

const extensions: Extension[] = [StarterKit]

export default function EventDescriptionsEditor({ content }: EventDescriptionsEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] })
    ],
    content
  })

  return (
    <div className="prose prose-sm prose-headings:text-md prose-headings:m-0 m-0 focus:outline-none">
      <EditorProvider
        slotBefore={<EditorToolbar />}
        content={content}
        extensions={extensions}
        onUpdate={({ editor }) => {
          console.log(editor.getHTML())
        }}
      ></EditorProvider>
    </div>
  )
}
