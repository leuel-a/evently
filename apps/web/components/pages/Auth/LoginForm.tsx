'use client';

import NextLink from 'next/link';
import {useRouter} from 'next/navigation';
import {Controller, useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '@/components/ui/button';
import {Field, FieldLabel, FieldError} from '@/components/ui/field';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {PasswordInput} from '@/components/blocks/Common';
import {emailSigninSchema, EmailSigninSchemaType} from '@/lib/db/schema';
import {emailSigninMutation} from '@/app/(auth)/queries';
import {APP_ROUTES} from '@/config/routes';
import {Separator} from '@/components/ui/separator';
import {Mail, Lock} from 'lucide-react';
import {GoogleSignIn} from './GoogleSignIn';

export function LoginForm() {
    const router = useRouter();
    const form = useForm<EmailSigninSchemaType>({
        resolver: zodResolver(emailSigninSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const mutation = useMutation({
        mutationFn: emailSigninMutation,
        onSuccess: () => {
            router.push(APP_ROUTES.dashboard.base);
        },
        // TODO: handle error case for login
    });

    const onSubmit = async (values: EmailSigninSchemaType) => {
        mutation.mutate(values);
    };

    return (
        <Card className="border-indigo-100/60 rounded shadow-sm">
            <CardHeader>
                <CardTitle className="text-slate-900">Welcome back</CardTitle>
                <CardDescription>Use Google or your email and password.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
                <GoogleSignIn />
                <div className="relative">
                    <Separator className="bg-indigo-100" />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-slate-500">
                        OR
                    </span>
                </div>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <Controller
                        control={form.control}
                        name="email"
                        render={({field, fieldState}) => {
                            return (
                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <div className="relative">
                                        <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <Input
                                            aria-invalid={fieldState.invalid}
                                            id="email"
                                            type="email"
                                            placeholder="leuel.asfaw@gmail.com"
                                            className="pl-9 focus-visible:ring-indigo-500"
                                            autoComplete="email"
                                            {...field}
                                        />
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            );
                        }}
                    />

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <NextLink
                                href="/forgot-password"
                                className="text-xs font-medium text-indigo-700 hover:text-indigo-800 underline underline-offset-4"
                            >
                                Forgot?
                            </NextLink>
                        </div>

                        <Controller
                            control={form.control}
                            name="password"
                            render={({field, fieldState}) => {
                                return (
                                    <Field>
                                        <div className="relative">
                                            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                            <PasswordInput
                                                aria-invalid={fieldState.invalid}
                                                id="password"
                                                type="password"
                                                placeholder="Password123"
                                                className="pl-9 focus-visible:ring-indigo-500"
                                                autoComplete="current-password"
                                                {...field}
                                            />
                                        </div>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                );
                            }}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        Sign in
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
