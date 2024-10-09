'use client'

import { Event } from '@/types/event'
import { revalidatePath } from 'next/cache'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useToast } from '@/hooks/use-toast'
import { updateEvent } from '@/app/dashboard/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateEventSchema, UpdateEventType } from '@/schemas/event'

// components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { DatePicker } from '@/components/common/date-picker'
import { SelectTime } from '@/components/dashboard/select-time'
import { SelectEventCategory } from '@/components/dashboard/select-event-category'

export interface EventFormProps {
  event: Event
}

export const EventForm = ({
  event: { id, title, description, date, startTime, endTime, location, virtual, category },
}: EventFormProps) => {
  const router = useRouter()
  const { toast } = useToast()
  const form = useForm<UpdateEventType>({
    resolver: zodResolver(updateEventSchema),
    defaultValues: {
      title,
      description,
      date,
      startTime,
      endTime: endTime !== null ? endTime : undefined,
      location: location !== null ? location : undefined,
      virtual,
      category,
    },
  })

  const handleSubmit = async (values: UpdateEventType) => {
    const updateEventFormData = new FormData()

    // append the values for the form
    updateEventFormData.append('id', id.toString())
    updateEventFormData.append('title', values.title)
    updateEventFormData.append('description', values.description)
    updateEventFormData.append('category', values.category)
    updateEventFormData.append('imageUrl', values.imageUrl ?? '')
    updateEventFormData.append('date', values.date.toString())
    updateEventFormData.append('startTime', values.startTime)
    updateEventFormData.append('endTime', values.endTime ?? '')
    updateEventFormData.append('location', values.location ?? '')
    updateEventFormData.append('virtual', String(values.virtual))

    const { errors } = await updateEvent(updateEventFormData)
    if (errors) {
      toast({
        variant: 'destructive',
        description: 'An error occurred while updating the event',
      })
    } else {
      router.refresh()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Event title" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Event description..." {...field} rows={10} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <DatePicker value={value} onChange={onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Time</FormLabel>
                <SelectTime
                  placeholder="Event starts at..."
                  onChange={field.onChange}
                  value={field.value}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Time</FormLabel>
                <SelectTime
                  placeholder="Event ends at..."
                  onChange={field.onChange}
                  value={field.value}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <SelectEventCategory onChange={field.onChange} value={field.value} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="virtual"
            render={({ field }) => (
              <FormItem className="mt-6 flex items-center gap-4">
                <FormControl>
                  <Checkbox
                    disabled={form.getValues('location') !== ''}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Virtual Event</FormLabel>
                  <FormDescription>
                    If your event is virtual, no need to add location.
                  </FormDescription>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    onChange={field.onChange}
                    value={field.value}
                    disabled={form.getValues('virtual') === true}
                    placeholder="Enter event location"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={form.formState.isSubmitting} className="w-80">
          Submit
        </Button>
      </form>
    </Form>
  )
}
