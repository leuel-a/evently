'use client'

import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@/components/ui/form'
import { Link } from '@/components/blocks/link'
import { Button } from '@/components/ui/button'
import { TextInput } from '@/components/blocks/form'
import { Separator } from '@/components/ui/separator'

import { signupSchema, SignupSchemaType } from './validation'

// TODO: figure out how to organize the queries and mutations for react query

export default function Page() {
  const form = useForm<SignupSchemaType>({
    shouldUseNativeValidation: false,
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = (values: SignupSchemaType) => {
    console.log(values)
  }

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
              <TextInput name="password" placeholder="Password" type="password" />
              <TextInput
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
