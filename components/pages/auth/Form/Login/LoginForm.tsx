import type {ComponentProps} from 'react';
import {useFormContext} from 'react-hook-form';
import Link from 'next/link';
import {PasswordInput} from '@/components/blocks/PasswordInput';
import {Button} from '@/components/ui/button';
import {Form, FormItem, FormControl, FormMessage, FormLabel, FormField} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {APP_ROUTES} from '@/config/routes';
import type {LoginUserSchemaType} from '@/lib/db/schema';

export function LoginForm(props: LoginFormProps) {
    const {handleSubmit: handleSubmitOverride, SubmitButtonProps = {}} = props;
    const form = useFormContext<LoginUserSchemaType>();

    const handleSubmit = (values: LoginUserSchemaType) => {
        handleSubmitOverride && handleSubmitOverride(values);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex w-[40rem] flex-col gap-6 bg-white p-8"
            >
                <div className="text-start tracking-wide">
                    <h2 className="text-2xl font-semibold">Login to Evently</h2>
                    <p className="mt-2 text-sm text-gray-500">Welcome back!</p>
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium">Email</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="h-12 rounded px-4 py-2 placeholder-indigo-400 focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="Enter your email"
                                    autoComplete="false"
                                />
                            </FormControl>
                            <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium">Password</FormLabel>
                            <FormControl>
                                <PasswordInput
                                    {...field}
                                    className="h-12 rounded px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="Enter your password"
                                />
                            </FormControl>
                            <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="h-12 rounded text-white transition-colors hover:bg-indigo-700" {...SubmitButtonProps}>Sign In</Button>
                <div className="flex justify-end">
                    <p className="text-sm">
                        Don't have an account?{' '}
                        <Link
                            className="text-indigo-700"
                            href={`${APP_ROUTES.auth.signup}`}
                        >
                            Signup
                        </Link>
                    </p>
                </div>
            </form>
        </Form>
    );
}

export interface LoginFormProps {
    handleSubmit?: (values: LoginUserSchemaType) => void;
    SubmitButtonProps?: ComponentProps<typeof Button>;
}
