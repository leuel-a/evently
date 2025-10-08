import type {ComponentProps} from 'react';
import {useFormContext} from 'react-hook-form';
import {Mail, Lock, LogIn, ArrowRight} from 'lucide-react';
import Link from 'next/link';
import {PasswordInput} from '@/components/blocks/PasswordInput';
import {Button} from '@/components/ui/button';
import {Form, FormItem, FormControl, FormMessage, FormLabel, FormField} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {APP_ROUTES} from '@/config/routes';
import type {LoginUserSchemaType} from '@/lib/db/schema';
import {cn} from '@/lib/utils';
import {LoginUserFormRootError} from './LoginUserFormRootError';

export function LoginUserForm(props: LoginFormProps) {
    const {
        handleSubmit: handleSubmitOverride,
        isSubmitting = false,
        SubmitButtonProps = {},
    } = props;
    const form = useFormContext<LoginUserSchemaType>();

    const handleSubmit = (values: LoginUserSchemaType) => {
        handleSubmitOverride && handleSubmitOverride(values);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex w-full max-w-2xl flex-col gap-6 bg-zinc-900/80 backdrop-blur-sm rounded border border-zinc-800 p-8 shadow-xl"
            >
                <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded flex items-center justify-center mx-auto shadow-lg">
                        <LogIn className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-zinc-400">Sign in to your Evently account</p>
                    </div>
                </div>
                <div className="space-y-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-white font-medium">Email</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                        <Input
                                            {...field}
                                            className="h-12 pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                                            placeholder="Enter your email"
                                            autoComplete="email"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-xs text-red-400" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-white font-medium">Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                        <PasswordInput
                                            {...field}
                                            className="h-12 pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                                            placeholder="Enter your password"
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-xs text-red-400" />
                            </FormItem>
                        )}
                    />
                    <LoginUserFormRootError />
                    <div className="flex justify-end">
                        <Link
                            href={APP_ROUTES.auth.base}
                            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
                        >
                            Forgot your password?
                        </Link>
                    </div>
                </div>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative h-12 w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold rounded transition-all duration-300 group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    {...SubmitButtonProps}
                >
                    {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            <span>Signing you in...</span>
                        </div>
                    ) : (
                        <>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700" />

                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Sign In
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </span>
                        </>
                    )}
                    <div className="absolute inset-0 rounded bg-indigo-500/20 blur-xl group-hover:bg-indigo-400/30 transition-all duration-300 -z-10" />
                </Button>
                <div className="text-center pt-4 border-t border-zinc-800">
                    <p className="text-zinc-400 text-sm">
                        Don't have an account?{' '}
                        <Link
                            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-300"
                            href={APP_ROUTES.auth.signup}
                        >
                            Create account
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
    isSubmitting?: boolean;
}
