'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import {
  Form,
  FormItem,
  FormControl,
  FormField,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { signupSchema } from '@/schemas/auth.schema'

export default function SignUpForm() {
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form className="min-w-[600px] space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Email</FormLabel>
              <FormControl>
                <Input className="h-12" placeholder="Enter your email here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Password</FormLabel>
              <FormControl>
                <Input
                  className="h-12"
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-md">Confirm Password</FormLabel>
              <FormControl>
                <Input className="h-12" type="password" placeholder="Confirm password" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="h-12 w-full text-md font-semibold bg-indigo-700 hover:bg-indigo-600">
          Sign Up
        </Button>
      </form>
    </Form>
  )
}
