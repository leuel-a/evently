'use client';

import {Fragment} from 'react';
import {useForm} from 'react-hook-form';
import {Mail, Phone, CreditCard, Lock, Send, MessageCircle} from 'lucide-react';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '@/components/ui/button';
import {
    Form,
    FormItem,
    FormControl,
    FormField,
    FormLabel,
    FormDescription,
    FormMessage,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {Separator} from '@/components/ui/separator';
import {checkoutSchema, CheckoutSchemaType} from '@/lib/db/schema';
import {cn} from '@/lib/utils';
import {CheckoutOrderSummary} from './CheckoutOrderSummary';

export function CheckoutForm() {
    const form = useForm<CheckoutSchemaType>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            contactMethod: 'email',
            email: '',
            phoneNumber: '',
        },
    });

    const {watch} = form;
    const contactMethod = watch('contactMethod');

    const onSubmit = (data: CheckoutSchemaType) => {
        console.log('Form submitted:', data);
        // Handle form submission logic here
    };

    return (
        <Fragment>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-6"
                >
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                                <Send className="w-5 h-5 text-indigo-400" />
                                Contact Method
                            </h3>

                            <FormField
                                control={form.control}
                                name="contactMethod"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                                            >
                                                <FormItem>
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            value="email"
                                                            id="email"
                                                            className="peer sr-only"
                                                        />
                                                    </FormControl>
                                                    <FormLabel
                                                        htmlFor="email"
                                                        className={cn(
                                                            'flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300',
                                                            field.value === 'email'
                                                                ? 'border-indigo-500 bg-indigo-500/10 text-white'
                                                                : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300',
                                                        )}
                                                    >
                                                        <div
                                                            className={cn(
                                                                'p-2 rounded-lg transition-colors',
                                                                field.value === 'email'
                                                                    ? 'bg-indigo-500/20'
                                                                    : 'bg-zinc-700/50',
                                                            )}
                                                        >
                                                            <Mail className="w-5 h-5" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-medium">Email</div>
                                                            <div className="text-sm text-zinc-500">
                                                                Get ticket via email
                                                            </div>
                                                        </div>
                                                    </FormLabel>
                                                </FormItem>

                                                <FormItem>
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            value="phoneNumber"
                                                            id="phoneNumber"
                                                            className="peer sr-only"
                                                        />
                                                    </FormControl>
                                                    <FormLabel
                                                        htmlFor="phoneNumber"
                                                        className={cn(
                                                            'flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all duration-300',
                                                            field.value === 'phoneNumber'
                                                                ? 'border-indigo-500 bg-indigo-500/10 text-white'
                                                                : 'border-zinc-700 bg-zinc-800/50 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300',
                                                        )}
                                                    >
                                                        <div
                                                            className={cn(
                                                                'p-2 rounded-lg transition-colors',
                                                                field.value === 'phoneNumber'
                                                                    ? 'bg-indigo-500/20'
                                                                    : 'bg-zinc-700/50',
                                                            )}
                                                        >
                                                            <MessageCircle className="w-5 h-5" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="font-medium">SMS</div>
                                                            <div className="text-sm text-zinc-500">
                                                                Get ticket via SMS
                                                            </div>
                                                        </div>
                                                    </FormLabel>
                                                </FormItem>
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        {/* Contact Input Field */}
                        <div className="space-y-4">
                            {contactMethod === 'email' && (
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="text-white font-medium">
                                                Email Address
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="your@email.com"
                                                    className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 h-12 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                                                />
                                            </FormControl>
                                            <FormDescription className="text-zinc-400">
                                                Your ticket QR code and confirmation will be sent to
                                                this email
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                            {contactMethod === 'phoneNumber' && (
                                <FormField
                                    control={form.control}
                                    name="phoneNumber"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel className="text-white font-medium">
                                                Phone Number
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="+251 9XX XXX XXX"
                                                    className="bg-zinc-800/50 border-zinc-700 text-white placeholder:text-zinc-500 h-12 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300"
                                                />
                                            </FormControl>
                                            <FormDescription className="text-zinc-400">
                                                Your ticket QR code will be sent via SMS to this
                                                number
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}
                        </div>
                    </div>

                    <Separator className="bg-zinc-800 my-2" />

                    {/* Order Summary */}
                    <CheckoutOrderSummary CheckoutQuantityInputProps={{title: 'Ticket Quantity'}} />

                    {/* Payment Button */}
                    <Button
                        type="submit"
                        className="relative h-14 w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 group overflow-hidden mt-6"
                    >
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700" />

                        <span className="relative z-10 flex items-center justify-center gap-3">
                            <CreditCard className="w-5 h-5" />
                            Complete Payment with Chapa
                        </span>

                        {/* Glow Effect */}
                        <div className="absolute inset-0 rounded-xl bg-indigo-500/20 blur-xl group-hover:bg-indigo-400/30 transition-all duration-300 -z-10" />
                    </Button>

                    {/* Security Notice */}
                    <div className="flex items-center justify-center gap-2 text-zinc-500 text-sm">
                        <Lock className="w-4 h-4" />
                        <span>Secure payment · Encrypted connection</span>
                    </div>
                </form>
            </Form>
        </Fragment>
    );
}
