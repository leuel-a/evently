'use client'

import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginType } from '@/app/auth/(primary)/login/schema'

// components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { PasswordInput } from '@/components/ui/password-input'

const LoginForm = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [visible, setVisible] = useState<boolean>(false)

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: LoginType) => {
    const { email, password } = values
    const response = await signIn<'credentials'>('credentials', {
      email,
      password,
      redirect: false,
    })

    if (!response?.error) {
      toast({ title: 'Login Successful' })

      router.push('/')
      router.refresh()
      return
    }

    form.setError('email', {
      message: 'Email or Password is not correct',
    })
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="leuel.asfaw@gmail.com"
                    {...field}
                  />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    visible={visible}
                    setVisible={setVisible}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={form.formState.isSubmitting}
            className="h-12"
            type="submit"
          >
            Log In
          </Button>
        </form>
      </Form>
      <p className="mt-4 text-sm text-gray-500">
        Don&apos;t have an account?{' '}
        <Link className="text-brunswick-green" href="/auth/signup">
          Sign Up
        </Link>
      </p>
    </div>
  )
}

export default LoginForm
