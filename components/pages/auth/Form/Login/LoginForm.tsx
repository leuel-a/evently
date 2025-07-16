import {useFormContext} from 'react-hook-form';

import {Input} from '@/components/ui/input';
import {PasswordInput} from '@/components/blocks/PasswordInput';
import {Button} from '@/components/ui/button';
import {Form, FormItem, FormControl, FormMessage, FormLabel, FormField} from '@/components/ui/form';

import type {LoginSchemaType} from './schema';

export function LoginForm({onSubmit}: LoginFormProps) {
    const methods = useFormContext<LoginSchemaType>();
    const {handleSubmit, control} = methods;

    return (
        <Form {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex w-[40rem] flex-col gap-6 bg-white p-8"
            >
                <div className="text-start tracking-wide">
                    <h2 className="text-2xl font-semibold">Login to Evently</h2>
                    <p className="mt-2 text-sm text-gray-500">Welcome back!</p>
                </div>
                <FormField
                    control={control}
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
                    control={control}
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
                <Button className="h-12 rounded text-white transition-colors hover:bg-indigo-700">Sign In</Button>
            </form>
        </Form>
    );
}

export interface LoginFormProps {
    onSubmit: (values: LoginSchemaType) => void;
}
