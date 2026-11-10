'use client';

import {ArrowRight, Minus, Plus, ShieldCheck} from 'lucide-react';
import {useForm, Controller} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {zodResolver} from '@hookform/resolvers/zod';
import {initializeChapaAcceptPaymentMutation} from '@/app/events/[id]/checkout/queries';
import {Field, FieldError, FieldLabel} from '@/components/ui/field';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Separator} from '@/components/ui/separator';
import {GetEventPageResult} from '@/app/events/actions';
import {checkoutSchema, CheckoutSchemaType} from '@/lib/db/schema';
import {MouseEventHandler} from 'react';

interface CheckoutFormProps {
    event: GetEventPageResult['data'];
    onQuantityChange: (q: number) => void;
    quantity: number;
}

export function CheckoutForm({event, onQuantityChange, quantity}: CheckoutFormProps) {
    const form = useForm<CheckoutSchemaType>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            amount: quantity,
            phoneNumber: '',
            name: '',
            email: '',
        },
    });

    const mutation = useMutation({
        mutationFn: initializeChapaAcceptPaymentMutation,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    const isFree = Number(event.ticketPrice ?? 0) === 0;
    const disableDecreaseOrder = quantity == 1;
    const disableIncreaseOrder = quantity == 10;

    const setQuantity = (delta: number) => {
        onQuantityChange(Math.max(1, Math.min(10, quantity + delta)));
    };

    const onSubmit = (values: CheckoutSchemaType) => {
        values.phoneNumber = '0912345678'; // TODO: remove this later on production
        mutation.mutate(values);
    };

    const handleQuantityChange =
        (delta: number): MouseEventHandler<HTMLButtonElement> =>
        () => {
            form.setValue('amount', delta);
            setQuantity(delta);
        };

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
                    name="amount"
                    render={({field, fieldState}) => {
                        return (
                            <Field>
                                <FieldLabel className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-indigo-950/50">
                                    Tickets
                                </FieldLabel>
                                <div className="flex items-center gap-3">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={handleQuantityChange(-1)}
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
                                        onClick={handleQuantityChange(1)}
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
                    render={({field, fieldState}) => (
                        <Field>
                            <FieldLabel>Phone Number</FieldLabel>
                            <Input
                                {...field}
                                type="text"
                                placeholder="+(251) 9185488 | 0929185488"
                            />
                            {fieldState.error && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    control={form.control}
                    name="name"
                    render={({field, fieldState}) => {
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
                    render={({field, fieldState}) => {
                        return (
                            <Field>
                                <FieldLabel>Email address</FieldLabel>
                                <Input {...field} type="email" placeholder="jane@gmail.com" />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        );
                    }}
                />

                <div className="mt-auto space-y-3">
                    <Button
                        size="lg"
                        type="submit"
                        className="w-full bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-500 cursor-pointer"
                    >
                        {isFree ? 'Reserve free ticket' : 'Pay & get ticket'}
                        <ArrowRight className="size-4" />
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
