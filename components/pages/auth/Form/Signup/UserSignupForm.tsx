import type {FormHTMLAttributes} from 'react';
import {useFormContext} from 'react-hook-form';
import type {UserSignupSchemaType} from '@/app/auth/schema';
import {PasswordInput} from '@/components/blocks/PasswordInput';
import {Button} from '@/components/ui/button';
import {Form, FormItem, FormControl, FormMessage, FormLabel, FormField} from '@/components/ui/form';
import {Input} from '@/components/ui/input';

export function UserSignupForm(props: UserSignupFormProps) {
    const {handleSubmit: handleSubmitOverride, ...formProps} = props;
    const form = useFormContext<UserSignupSchemaType>();

    const onSubmit = (values: UserSignupSchemaType) => {
        handleSubmitOverride && handleSubmitOverride(values);
    };

    return (
        <Form {...form}>
            <form
                {...formProps}
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-[50rem] flex-col gap-6 bg-white p-8"
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
                <Button className="h-12 rounded text-white transition-colors hover:bg-indigo-500">Sign Up</Button>
            </form>
        </Form>
    );
}

export interface UserSignupFormProps extends FormHTMLAttributes<HTMLFormElement> {
    handleSubmit?: (values: UserSignupSchemaType) => void;
}
