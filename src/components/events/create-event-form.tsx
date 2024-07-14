'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createEventSchema, CreateEventValues } from '@/app/events/create/validation'

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import EventDescriptionsEditor from './event-descriptions/event-descriptions-editor'

export default function CreateEventForm() {
  const onSubmit = async (values: CreateEventValues) => {
    console.log(values)
  }

  const form = useForm<CreateEventValues>({
    resolver: zodResolver(createEventSchema)
  })

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="..." type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <EventDescriptionsEditor content={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2">
            <FormField
              name="date"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="fee"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fee</FormLabel>
                  <FormControl></FormControl>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  )
}
