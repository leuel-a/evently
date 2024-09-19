'use client'

import Link from 'next/link'
import { useState } from 'react'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from './ui/input'
import { Button } from '@/components/ui/button'
import { PasswordInput } from '@/components/ui/password-input'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { createUser } from '@/app/auth/(primary)/signup/actions'
import { createUserSchema, CreateUserType } from '@/app/auth/(primary)/signup/schema'

export default function SignupForm() {
  const router = useRouter()
  const [visible, setVisible] = useState<boolean>(false)

  const form = useForm<CreateUserType>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {},
  })

  const { toast } = useToast()

  const onSubmit = async (values: CreateUserType) => {
    console.log('about to create the new user')
    try {
      await createUser(values)
      toast({ description: 'You have been registered. Please login.' })

      router.push('/auth/login')
    } catch (err) {
      toast({
        variant: 'destructive',
        description: 'An error has occured please try again.',
      })
    }
  }

  return (
    <div className="space-y-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Name <span className="text-red-700">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <span className="text-red-700">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your email" {...field} />
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
                <FormLabel>
                  Password <span className="text-red-700">*</span>
                </FormLabel>
                <FormControl>
                  <PasswordInput
                    visible={visible}
                    setVisible={setVisible}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className="h-12"
          >
            Create Account
          </Button>
        </form>
      </Form>
      <p className="mt-4 text-sm text-gray-500">
        Already have an account?{' '}
        <Link className="text-brunswick-green" href="/auth/login">
          Sign In
        </Link>
      </p>
    </div>
  )
}
