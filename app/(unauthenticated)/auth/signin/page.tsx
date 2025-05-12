'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Link } from '@/components/blocks/link'
import { TextInput } from '@/components/blocks/form'
import { Separator } from '@/components/ui/separator'

import { loginSchema, LoginSchemaType } from './validation'

export default function Page() {
  const form = useForm<LoginSchemaType>({
    shouldUseNativeValidation: false,
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = (values: LoginSchemaType) => {
    // TODO: make the request to create the new user
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
              <TextInput name="email" placeholder="Email" />
              <TextInput name="password" placeholder="Password" type="password" />
            </div>
            <Button type="submit" className="h-12 w-full">
              Sign Up
            </Button>
          </form>
        </Form>

        <Separator className="my-8 w-full" />

        <p className="text-gray-500">
          Don't have an account?{' '}
          <span>
            <Link className="text-indigo-500" href="/auth/signup">
              Sign Up
            </Link>
          </span>
        </p>
      </div>
    </main>
  )
}
