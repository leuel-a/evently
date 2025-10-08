import type {FormHTMLAttributes, ComponentProps, DetailedHTMLProps} from 'react';
import {useFormContext} from 'react-hook-form';
import {User, Mail, Lock, Building, ArrowRight} from 'lucide-react';
import Link from 'next/link';
import {BooleanInput} from '@/components/blocks/BooleanInput';
import {PasswordInput} from '@/components/blocks/PasswordInput';
import {Button} from '@/components/ui/button';
import {Form, FormItem, FormControl, FormMessage, FormLabel, FormField} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {APP_ROUTES} from '@/config/routes';
import type {UserSignupSchemaType} from '@/lib/db/schema';

export function UserSignupForm(props: UserSignupFormProps) {
    const {handleSubmit: handleSubmitOverride, SubmitButtonProps = {}, ...formProps} = props;
    const form = useFormContext<UserSignupSchemaType>();

    const userIsOrganizer = form.watch('isOrganizer');

    const handleSubmit = (values: UserSignupSchemaType) => {
        handleSubmitOverride && handleSubmitOverride(values);
    };

    return (
        <Form {...form}>
            <form
                {...formProps}
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex w-full max-w-2xl flex-col gap-6 bg-zinc-900/80 backdrop-blur-sm rounded border border-zinc-800 p-8 shadow-xl"
            >
                <div className="text-center space-y-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-violet-600 rounded flex items-center justify-center mx-auto shadow-lg">
                        <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                            Join Evently
                        </h2>
                        <p className="mt-2 text-zinc-400">Create your account to get started</p>
                    </div>
                </div>
                <div className="space-y-5">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-white font-medium">Full Name</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                        <Input
                                            {...field}
                                            className="h-12 pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                                            placeholder="Enter your full name"
                                            autoComplete="name"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-xs text-red-400" />
                            </FormItem>
                        )}
                    />
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
                                            placeholder="Create a password"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-xs text-red-400" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="text-white font-medium">
                                    Confirm Password
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                        <PasswordInput
                                            {...field}
                                            className="h-12 pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                                            placeholder="Confirm your password"
                                        />
                                    </div>
                                </FormControl>
                                <FormMessage className="text-xs text-red-400" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="isOrganizer"
                        render={({field}) => (
                            <FormItem className="flex items-center justify-between p-4 bg-zinc-800/30 rounded border border-zinc-700">
                                <div>
                                    <FormLabel className="text-white font-medium">
                                        I'm an event organizer
                                    </FormLabel>
                                    <p className="text-zinc-400 text-sm mt-1">
                                        Create and manage events
                                    </p>
                                </div>
                                <FormControl>
                                    <BooleanInput
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {userIsOrganizer && (
                        <FormField
                            control={form.control}
                            name="organizationName"
                            render={({field}) => (
                                <FormItem className="animate-in fade-in-50">
                                    <FormLabel className="text-white font-medium">
                                        Organization Name
                                    </FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                            <Input
                                                {...field}
                                                className="h-12 pl-10 bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                                                placeholder="Enter your company name"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-xs text-red-400" />
                                </FormItem>
                            )}
                        />
                    )}
                </div>
                <Button
                    type="submit"
                    className="relative h-12 w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold rounded transition-all duration-300 group overflow-hidden mt-4"
                    {...SubmitButtonProps}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700" />

                    <span className="relative z-10 flex items-center justify-center gap-2">
                        Create Account
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                </Button>
                <div className="text-center pt-4 border-t border-zinc-800">
                    <p className="text-zinc-400 text-sm">
                        Already have an account?{' '}
                        <Link
                            className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors duration-300"
                            href={APP_ROUTES.auth.login}
                        >
                            Sign in here
                        </Link>
                    </p>
                </div>
            </form>
        </Form>
    );
}

type DefaultFormProps = DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;

export interface UserSignupFormProps extends DefaultFormProps {
    handleSubmit?: (values: UserSignupSchemaType) => void;
    SubmitButtonProps?: ComponentProps<typeof Button>;
}
