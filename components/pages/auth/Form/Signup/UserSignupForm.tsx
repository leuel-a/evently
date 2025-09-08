import type {FormHTMLAttributes, ComponentProps, DetailedHTMLProps} from 'react';
import {useFormContext} from 'react-hook-form';
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
                className="flex w-[50rem] flex-col gap-4 bg-white p-8"
            >
                <div className="text-start tracking-wide">
                    <h2 className="text-2xl font-semibold">Welcome</h2>
                    <p className="mt-2 text-sm text-gray-500">Signup to Evently</p>
                </div>
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium">Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className="h-12 rounded px-4 py-2 placeholder-indigo-400 focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="Enter your Full Name"
                                    autoComplete="false"
                                />
                            </FormControl>
                            <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                    )}
                />
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="text-sm font-medium">Repeat your Password</FormLabel>
                            <FormControl>
                                <PasswordInput
                                    {...field}
                                    className="h-12 rounded px-4 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                                    placeholder="Repeat your password"
                                />
                            </FormControl>
                            <FormMessage className="text-xs text-red-500" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isOrganizer"
                    render={({field}) => (
                        <FormItem className="flex items-center gap-4">
                            <FormLabel className="text-sm font-medium">Are you an organizer?</FormLabel>
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
                            <FormItem>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="What is the name of your company?"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <Button
                    type="submit"
                    className="h-12 cursor-pointer rounded text-white transition-colors hover:bg-indigo-500"
                    {...SubmitButtonProps}
                >
                    Sign Up
                </Button>
                <div className="flex justify-end">
                    <p className="text-sm">
                        Already have an account?{' '}
                        <Link
                            className="text-indigo-700"
                            href={`${APP_ROUTES.auth.login}`}
                        >
                            Login
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
