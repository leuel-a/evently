import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { createEvent } from '@/app/dashboard/actions'
import { zodResolver } from '@hookform/resolvers/zod'
import { createEventSchema, CreateEventType } from '@/schemas/event'

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

export const CreateEventForm = () => {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<CreateEventType>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      imageUrl: undefined,
      date: undefined,
      startTime: '',
      endTime: '',
      location: '',
      virtual: false,
    },
  })

  const handleSubmit = async (values: CreateEventType) => {
    const formData = new FormData()

    // append the values for the form
    formData.append('title', values.title)
    formData.append('description', values.description)
    formData.append('category', values.category)
    formData.append('imageUrl', values.imageUrl ?? '')
    formData.append('date', values.date.toString())
    formData.append('startTime', values.startTime)
    formData.append('endTime', values.endTime ?? '')
    formData.append('location', values.location ?? '')
    formData.append('virtual', String(values.virtual))

    const { errors } = await createEvent(formData)

    if (errors) {
      toast({
        variant: 'destructive',
        description: 'There was an error creating the event',
      })
    } else {
      toast({
        variant: 'default',
        description: 'Event created successfully',
      })

      router.push(`/dashboard/events`)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} action="" className="space-y-8">
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
                    {...location}
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
