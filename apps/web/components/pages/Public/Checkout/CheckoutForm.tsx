'use client';

import { useState } from 'react';
import { ArrowRight, Minus, Plus, ShieldCheck } from 'lucide-react';
import { useForm, Controller, type ControllerRenderProps } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { initializeChapaAcceptPaymentMutation, InitializeChapaAcceptPaymentPayload } from '@/app/events/[id]/checkout/queries';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { GetEventPageResult } from '@/app/events/actions';
import { checkoutSchema, CheckoutSchemaType } from '@/lib/db/schema';
import { MouseEventHandler } from 'react';
import { LoadingSpinner } from '@/components/blocks/Common';
import { redirectToCheckout } from '@/app/events/[id]/checkout/actions';

interface CheckoutFormProps {
    event: GetEventPageResult['data'];
    onQuantityChange: (q: number) => void;
    quantity: number;
}

export function CheckoutForm({ event, onQuantityChange, quantity }: CheckoutFormProps) {
    const [initializingChapaPayment, setInitializingChapaPayment] = useState<boolean>(false);

    const form = useForm<CheckoutSchemaType>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            phoneNumber: '',
            quantity: 1,
            name: '',
            email: '',
        },
    });

    const mutation = useMutation({
        mutationFn: initializeChapaAcceptPaymentMutation,
        onSuccess: async (data) => {
            // TODO: handle if response data is undefined
            setInitializingChapaPayment(false);
            if (data?.data && data?.data?.checkout_url) {
                await redirectToCheckout(data?.data?.checkout_url);
            }
        },
        onError: (error) => {
            setInitializingChapaPayment(false);
            console.log(error);
        },
    });

    const unitPrice = Number(event.ticketPrice ?? 0);
    const isFree = unitPrice === 0;
    const disableDecreaseOrder = quantity == 1;
    const disableIncreaseOrder = quantity == 10;

    const onSubmit = (values: CheckoutSchemaType) => {
        values.phoneNumber = '0900123456'; // TODO: remove this later on production
        const payload: InitializeChapaAcceptPaymentPayload = {
            ...values,
            amount: quantity * unitPrice
        }
        setInitializingChapaPayment(true);
        mutation.mutate(payload);
    };

    const handleQuantityChange =
        (delta: number, field: ControllerRenderProps<CheckoutSchemaType, 'quantity'>): MouseEventHandler<HTMLButtonElement> =>
            () => {
                // INFO: Ten is the max number of tickets that can be bought at once
                const next = Math.max(1, Math.min(10, quantity + delta))
                field.onChange(next);
                onQuantityChange(next);
            }

    return (
        <div className="flex flex-col col-span-2 gap-8 bg-white px-8 py-10 lg:px-10 lg:py-12">
            <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-indigo-400">
                    Checkout
                </p>

                <h2 className="mt-2 font-serif text-2xl tracking-tight text-indigo-950">
                    Complete your order
                </h2>

                <p className="text-xs mt-1 font-semibold uppercase tracking-tight text-indigo-950/50">
                    Your details
                </p>
            </div>

            <Separator className="bg-indigo-50" />

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
                <Controller
                    control={form.control}
                    name="quantity"
                    render={({ field, fieldState }) => {
                        return (
                            <Field>
                                <FieldLabel className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-indigo-950/50">
                                    Tickets
                                </FieldLabel>
                                <div className="flex items-center gap-3">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={handleQuantityChange(-1, field)}
                                        disabled={disableDecreaseOrder}
                                        className="flex size-9 items-center justify-center rounded-lg border border-indigo-100 text-indigo-400 transition hover:border-indigo-300 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <Minus className="size-3.5" />
                                    </Button>
                                    <span className="w-6 text-center text-sm font-semibold text-indigo-950 tabular-nums">
                                        {field.value}
                                    </span>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={handleQuantityChange(1, field)}
                                        disabled={disableIncreaseOrder}
                                        className="flex size-9 items-center justify-center rounded-lg border border-indigo-100 text-indigo-400 transition hover:border-indigo-300 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <Plus className="size-3.5" />
                                    </Button>
                                    <span className="text-xs text-indigo-950/40">
                                        Max 10 per order
                                    </span>
                                </div>
                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        );
                    }}
                />

                <Controller
                    control={form.control}
                    name="phoneNumber"
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel>Phone Number</FieldLabel>
                            <Input
                                {...field}
                                type="text"
                                // TODO: have a better placeholder
                                placeholder="+(251) 9185488 | 0929185488"
                            />
                            {fieldState.error && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => {
                        return (
                            <Field>
                                <FieldLabel>Full name</FieldLabel>
                                <Input {...field} type="text" placeholder="Abebe Girma" />
                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        );
                    }}
                />

                <Controller
                    control={form.control}
                    name="email"
                    render={({ field, fieldState }) => {
                        return (
                            <Field>
                                <FieldLabel>Email address</FieldLabel>
                                <Input {...field} type="email" placeholder="abebe.girma@gmail.com" />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        );
                    }}
                />

                <div className="mt-auto space-y-3">
                    <Button
                        disabled={initializingChapaPayment}
                        type="submit"
                        className="w-full h-12 rounded bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-500 cursor-pointer"
                    >
                        {!initializingChapaPayment && (isFree ? 'Reserve free ticket' : 'Pay & get ticket')}
                        {initializingChapaPayment ? <LoadingSpinner className="h-full" spinClassName="border-white h-8 w-8" /> : <ArrowRight className="size-4" />}
                    </Button>

                    <div className="flex items-center justify-center gap-1.5 text-xs text-indigo-950/35">
                        <ShieldCheck className="size-3.5" />
                        Secured by Chapa · Your ticket arrives by email
                    </div>
                </div>
            </form>
        </div>
    );
}
