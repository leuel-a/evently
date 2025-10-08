'use client';

import type {SetStateAction, Dispatch} from 'react';
import {Minus, Plus, Ticket} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';

export interface CheckoutQuantityInputProps {
    title?: string | boolean;
    quantity: number;
    setQuantity: Dispatch<SetStateAction<number>>;
    maxQuantity?: number;
    className?: string;
}

export function CheckoutQuantityInput({
    quantity,
    setQuantity,
    title = 'Number of Tickets',
    maxQuantity = 10,
    className,
}: CheckoutQuantityInputProps) {
    const increaseQuantity = () => {
        if (quantity < maxQuantity) {
            setQuantity((prev) => prev + 1);
        }
    };

    const decreaseQuantity = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const isMin = quantity === 1;
    const isMax = quantity >= maxQuantity;

    return (
        <div className={cn('space-y-4', className)}>
            <div className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-indigo-400" />
                <span className="text-white font-medium text-lg">{title}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
                <Button
                    type="button"
                    disabled={isMin}
                    onClick={decreaseQuantity}
                    variant="outline"
                    size="icon"
                    className={cn(
                        'w-10 h-10 rounded-lg border-2 transition-all duration-300',
                        isMin
                            ? 'border-zinc-700 bg-zinc-800/30 text-zinc-600 cursor-not-allowed'
                            : 'border-zinc-600 bg-zinc-800 hover:border-indigo-500 hover:bg-indigo-500/20 hover:text-indigo-300 text-zinc-400',
                    )}
                >
                    <Minus className="w-4 h-4" />
                </Button>

                <div className="flex flex-col items-center mx-6">
                    <span className="text-2xl font-bold text-white">{quantity}</span>
                    <span className="text-xs text-zinc-500 mt-1">
                        ticket{quantity !== 1 ? 's' : ''}
                    </span>
                </div>

                <Button
                    disabled={isMax}
                    onClick={increaseQuantity}
                    variant="outline"
                    type="button"
                    size="icon"
                    className={cn(
                        'w-10 h-10 rounded-lg border-2 transition-all duration-300',
                        isMax
                            ? 'border-zinc-700 bg-zinc-800/30 text-zinc-600 cursor-not-allowed'
                            : 'border-zinc-600 bg-zinc-800 hover:border-indigo-500 hover:bg-indigo-500/20 hover:text-indigo-300 text-zinc-400',
                    )}
                >
                    <Plus className="w-4 h-4" />
                </Button>
            </div>

            {maxQuantity && (
                <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-500">Maximum per order</span>
                    <span
                        className={cn(
                            'font-medium',
                            quantity === maxQuantity ? 'text-amber-400' : 'text-zinc-400',
                        )}
                    >
                        {maxQuantity} tickets
                    </span>
                </div>
            )}
        </div>
    );
}
