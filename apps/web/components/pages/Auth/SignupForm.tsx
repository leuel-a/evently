'use client';

import {z} from 'zod';
import {Controller, useForm} from 'react-hook-form';
import {Mail, Lock, User} from 'lucide-react';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Field, FieldLabel, FieldError, FieldDescription} from '@/components/ui/field';
import {Input} from '@/components/ui/input';
import {Separator} from '@/components/ui/separator';
import {GoogleSignIn} from './GoogleSignIn';

const signupSchema = z.object({
    email: z.string({error: 'Required'}),
    password: z.string({error: 'Required'}),
    fullName: z.string({error: 'Required'}),
    confirmPassword: z.string({error: 'Required'}),
});

type SignupSchemaType = z.infer<typeof signupSchema>;

export function SignupForm() {
    const form = useForm<SignupSchemaType>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: '',
            password: '',
            fullName: '',
            confirmPassword: '',
        },
    });

    return (
        <Card className="border-indigo-100/60 rounded shadow-sm">
            <CardHeader>
                <CardTitle className="text-slate-900">Join Event Manager</CardTitle>
                <CardDescription>Google or email, your choice.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
                {/* TODO: MAKE THIS WORK FOR BOTH SIGNUP AND SIGNIN */}
                <GoogleSignIn />
                <div className="relative">
                    <Separator className="bg-indigo-100" />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-slate-500">
                        OR
                    </span>
                </div>
                <form className="space-y-4">
                    <Controller
                        control={form.control}
                        name="fullName"
                        render={({field, fieldState}) => {
                            return (
                                <Field className="space-y-2">
                                    <FieldLabel>Full Name</FieldLabel>
                                    <div className="relative">
                                        <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <Input
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Leuel Asfaw"
                                            className="pl-9 focus-visible:ring-indigo-500"
                                            autoComplete="name"
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
                                </Field>
                            );
                        }}
                    />

                    <Controller
                        control={form.control}
                        name="password"
                        render={({field, fieldState}) => {
                            return (
                                <Field className="space-y-2">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                    <div className="space-y-1">
                                        <div className="relative">
                                            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                            <Input
                                                aria-invalid={fieldState.invalid}
                                                id="password"
                                                type="password"
                                                placeholder="Create a password"
                                                className="pl-9 focus-visible:ring-indigo-500"
                                                autoComplete="new-password"
                                                {...field}
                                            />
                                        </div>
                                        <FieldDescription className="text-xs text-slate-500">
                                            Password rule placeholder: at least 8 characters, one
                                            number, one sparkle ✨
                                        </FieldDescription>
                                    </div>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            );
                        }}
                    />

                    <Controller
                        control={form.control}
                        name="confirmPassword"
                        render={({field, fieldState}) => {
                            return (
                                <Field className="space-y-2">
                                    <FieldLabel>Confirm password</FieldLabel>
                                    <div className="relative">
                                        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                        <Input
                                            id="confirm"
                                            type="password"
                                            placeholder="Repeat it"
                                            className="pl-9 focus-visible:ring-indigo-500"
                                            autoComplete="new-password"
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

                    <Button
                        type="submit"
                        className="w-full rounded bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                        Create account
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
