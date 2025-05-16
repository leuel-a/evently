'use client'

import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'

import { useToast } from '@/hooks/use-toast'
import { Form } from '@/components/ui/form'
import { Link } from '@/components/blocks/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { TextInput, PasswordInput } from '@/components/blocks/form'

import { createUserMutation } from './queries/mutations'
import { createUserSchema, CreateUserType } from './validation'

export default function Page() {
  const form = useForm<CreateUserType>({
    shouldUseNativeValidation: false,
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const { toast } = useToast()

  const { mutate } = useMutation({
    mutationFn: createUserMutation,
    onSuccess: () => {
      // TODO: generate the access token for the user and login the user
      // without forcing the user the user to login
      toast({
        title: 'Success',
        description: 'You have been successfully registered.',
        variant: 'default',
      })
    },
    onError: (error) => {
      // TODO: add a logger instead of just using browser console
      console.log(error)

      toast({
        title: 'Error',
        description: 'Something went wrong while signing you up.',
        variant: 'destructive'
      })
    },
  })

  const onSubmit = (values: CreateUserType) => mutate(values)

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="w-[500px] lg:w-[800px]">
        <div className="mb-5 text-center">
          <Link href="/" className="text-4xl font-bold text-indigo-700">
            Evently
          </Link>
        </div>
        <Form {...form}>
          <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
              <TextInput name="username" placeholder="Username" />
              <TextInput name="email" placeholder="Email" />
              <PasswordInput name="password" placeholder="Password" type="password" />
              <PasswordInput
                name="confirmPassword"
                placeholder="Confirm your password"
                type="password"
              />
            </div>
            <Button type="submit" className="h-12 w-full">
              Sign Up
            </Button>
          </form>
        </Form>
        <Separator className="my-8 w-full" />
        <p className="text-gray-500">
          Already have an account?{' '}
          <span>
            <Link className="text-indigo-500" href="/auth/signin">
              Sign In
            </Link>
          </span>
        </p>
      </div>
    </main>
  )
}
