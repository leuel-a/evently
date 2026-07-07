'use client';

import {ArrowRight, Loader2, Minus, Plus, ShieldCheck} from 'lucide-react';
import {useForm, Controller} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Field, FieldError, FieldLabel} from '@/components/ui/field';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Separator} from '@/components/ui/separator';
import {cn} from '@/lib/utils';
import {GetEventPageResult} from '@/app/events/actions';
import {checkoutSchema, CheckoutSchemaType} from '@/lib/db/schema';

interface CheckoutFormProps {
    event: GetEventPageResult['data'];
    onQuantityChange: (q: number) => void;
    onDiscountChange: (amount: number) => void;
    quantity: number;
}

export function CheckoutForm({event, onQuantityChange, quantity}: CheckoutFormProps) {
    const form = useForm<CheckoutSchemaType>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            name: '',
            email: '',
            confirmEmail: '',
        },
    });

    const isFree = Number(event.ticketPrice ?? 0) === 0;

    const setQuantity = (delta: number) => {
        onQuantityChange(Math.max(1, Math.min(10, quantity + delta)));
    };

    const onSubmit = (values: CheckoutSchemaType) => {
        console.log(values);
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
            </div>

            <div>
                <Label className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-indigo-950/50">
                    Tickets
                </Label>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setQuantity(-1)}
                        disabled={quantity <= 1}
                        className="flex size-9 items-center justify-center rounded-lg border border-indigo-100 text-indigo-400 transition hover:border-indigo-300 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <Minus className="size-3.5" />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold text-indigo-950 tabular-nums">
                        {quantity}
                    </span>
                    <button
                        type="button"
                        onClick={() => setQuantity(1)}
                        disabled={quantity >= 10}
                        className="flex size-9 items-center justify-center rounded-lg border border-indigo-100 text-indigo-400 transition hover:border-indigo-300 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <Plus className="size-3.5" />
                    </button>
                    <span className="text-xs text-indigo-950/40">Max 10 per order</span>
                </div>
            </div>

            <Separator className="bg-indigo-50" />

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-indigo-950/50">
                    Your details
                </p>

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

                <Controller
                    control={form.control}
                    name="confirmEmail"
                    render={({field, fieldState}) => {
                        return (
                            <Field>
                                <FieldLabel>Confirm email</FieldLabel>
                                <Input {...field} type="email" placeholder="abebe@example.com" />
                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        );
                    }}
                />

                <div className="mt-auto space-y-3">
                    <Button
                        size="lg"
                        type="submit"
                        className="w-full bg-indigo-600 text-white shadow-md shadow-indigo-200 hover:bg-indigo-500"
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
