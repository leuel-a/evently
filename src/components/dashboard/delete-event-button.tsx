'use client'

import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { deleteEvent } from '@/app/dashboard/actions'

//region components
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Trash } from 'lucide-react'

//endregion

export interface DeleteEventButtonProps {
  eventId: number
}

export const DeleteEventButton = ({ eventId }: DeleteEventButtonProps) => {
  const { toast } = useToast()
  const handleDelete = async () => {
    const deleteFormData = new FormData()

    // id must be passed with the form data to the server action
    deleteFormData.append('id', eventId.toString())

    const { errors } = await deleteEvent(deleteFormData)
    if (errors) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong when deleting the event. Please try again.',
      })
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Trash />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action can not be undone. This will permanently delete the event from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
