'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createEventSchema, CreateEventValues } from '@/app/dashboard/events/create/validation'

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { EventDatePicker } from './event-date-picker'
import EventDescriptionsEditor from './event-descriptions/event-descriptions-editor'

export default function CreateEventForm() {
  const form = useForm<CreateEventValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: '',
      description: '',
      date: undefined,
      fee: undefined
    }
  })

  const [free, setFree] = React.useState<boolean>(false)

  // Submit function to handle form submission
  const onSubmit = async (values: CreateEventValues) => {
    console.log(values)
  }

  // Clears the form fields
  // Check if the date is being reseted by this piece of code?
  const onClear = () => {
    form.reset()
    setFree(false)
  }

  return (
    <div>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Title</FormLabel>
                <FormControl>
                  <Input
                    className="focus-visible:ring-indigo-700 focus-visible:ring-offset-0"
                    placeholder="..."
                    type="text"
                    {...field}
                  />
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <EventDescriptionsEditor setContent={field.onChange} content={field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              name="date"
              control={form.control}
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Date</FormLabel>
                  <FormControl className="">
                    <EventDatePicker onSelect={field.onChange} date={field.value} />
                  </FormControl>
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
                  <FormControl>
                    <div className="flex gap-8">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          className="data-[state=checked]:bg-indigo-700"
                          checked={free}
                          onCheckedChange={() => setFree(prev => !prev)}
                          id="free"
                        />
                        <Label
                          htmlFor="free"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Free
                        </Label>
                      </div>
                      <Input
                        disabled={free}
                        className="focus-visible:ring-indigo-700 focus-visible:ring-offset-0"
                        placeholder="How much does it cost..."
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClear}
              className="w-80 border-indigo-700 hover:border-indigo-500"
            >
              Clear
            </Button>
            <Button type="submit" className="w-80 bg-indigo-700 hover:bg-indigo-500">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
