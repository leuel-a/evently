'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { loginSchema } from '@/schemas/auth.schema'

export default function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {}
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
                <Input className="h-12" placeholder="Enter your email here..." {...field} />
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
                  placeholder="Enter your password here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full h-12 bg-indigo-700 hover:bg-indigo-600 text-md">
          Sign In
        </Button>
      </form>
    </Form>
  )
}
