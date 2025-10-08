'use client';

import {useState} from 'react';
import {Receipt, BadgeCheck} from 'lucide-react';
import {useSearchParams} from 'next/navigation';
import {Separator} from '@/components/ui/separator';
import {CheckoutQuantityInput, type CheckoutQuantityInputProps} from './CheckoutQuantityInput';

export interface CheckoutOrderSummaryProps {
    CheckoutQuantityInputProps?: Omit<CheckoutQuantityInputProps, 'quantity' | 'setQuantity'>;
}

export function CheckoutOrderSummary({CheckoutQuantityInputProps = {}}: CheckoutOrderSummaryProps) {
    const [quantity, setQuantity] = useState<number>(1);
    const {title} = CheckoutQuantityInputProps;

    const params = useSearchParams();
    const price = parseInt(params.get('price') ?? '0');
    const eventTitle = params.get('title') || 'Event Ticket';

    const totalPrice = price * quantity;
    const isFree = price === 0;

    return (
        <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl border border-zinc-700 p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                    <Receipt className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white">Order Summary</h2>
                    <p className="text-zinc-400 text-sm">Review your purchase details</p>
                </div>
            </div>
            <div className="mb-6 p-4 bg-zinc-700/30 rounded-xl border border-zinc-600">
                <h3 className="font-semibold text-white text-lg line-clamp-2 mb-2">{eventTitle}</h3>
                <div className="flex justify-between items-center">
                    <span className="text-zinc-400 text-sm">Price per ticket</span>
                    <span className="text-white font-medium">
                        {isFree ? 'Free' : `Birr ${price}`}
                    </span>
                </div>
            </div>
            <div className="mb-6">
                <CheckoutQuantityInput
                    title={title}
                    quantity={quantity}
                    setQuantity={setQuantity}
                    className="bg-zinc-700/30 rounded-xl p-4 border border-zinc-600"
                />
            </div>
            <Separator className="bg-zinc-700 mb-4" />
            <div className="space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-zinc-300">Subtotal</span>
                    <span className="text-zinc-300">{isFree ? 'Free' : `Birr ${totalPrice}`}</span>
                </div>
                {!isFree && (
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-zinc-400">Processing fee</span>
                        <span className="text-zinc-400">Included</span>
                    </div>
                )}
                <Separator className="bg-zinc-700" />
                <div className="flex justify-between items-center pt-2">
                    <span className="text-white font-semibold text-lg">Total</span>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-white">
                            {isFree ? 'Free' : `Birr ${totalPrice}`}
                        </div>
                        <div className="text-zinc-400 text-sm">
                            {quantity} ticket{quantity > 1 ? 's' : ''}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-700">
                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                    <BadgeCheck className="w-4 h-4 text-emerald-400" />
                    <span>Secured payment · Instant confirmation</span>
                </div>
            </div>
        </div>
    );
}
