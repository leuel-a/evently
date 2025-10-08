'use client';

import {useState} from 'react';
import {CreditCard, Lock, CheckCircle2} from 'lucide-react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import type {Events} from '@/app/generated/client';
import {Button} from '@/components/ui/button';
import {APP_ROUTES} from '@/config/routes';
import {CheckoutQuantityInput} from './Checkout/CheckoutQuantityInput';

interface ReserveYourSpotProps {
    event: Events;
}

export function ReserveYourSpot({event}: ReserveYourSpotProps) {
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedPayment, setSelectedPayment] = useState<'stripe' | 'chapa' | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const totalPrice = event.price * quantity;
    const isFree = event.isFree;
    const isSoldOut = event.capacity && event.capacity <= 0;

    function buildCheckoutParams(paymentMethod: 'stripe' | 'chapa') {
        const params = new URLSearchParams();
        params.set('quantity', quantity.toString());
        params.set('id', event.id);
        params.set('title', event.title);
        params.set('price', event.price.toString());
        params.set('paymentMethod', paymentMethod);
        return params.toString();
    }

    const handlePaymentSelect = (method: 'stripe' | 'chapa') => {
        setSelectedPayment(method);
        setIsProcessing(true);

        // Simulate processing delay for better UX
        setTimeout(() => {
            setIsProcessing(false);
        }, 1000);
    };

    const handleReserveFreeSpot = () => {
        setIsProcessing(true);
        // Handle free event reservation logic here
        setTimeout(() => {
            setIsProcessing(false);
            // Redirect to confirmation page
            window.location.href = `${APP_ROUTES.events.base}/${event.id}/confirmation?free=true`;
        }, 1500);
    };

    if (isSoldOut) {
        return (
            <div className="w-full xl:max-w-md mx-auto bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl p-8 space-y-6">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8 text-red-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Sold Out</h2>
                    <p className="text-zinc-400">
                        This event has reached full capacity. Check back for future events!
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full xl:max-w-md mx-auto bg-zinc-900 rounded-2xl border border-zinc-800 shadow-xl p-8 space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">Reserve Your Spot</h2>
                {isFree && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400 text-sm font-medium">Free Event</span>
                    </div>
                )}
            </div>

            <div className="space-y-4 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
                <CheckoutQuantityInput
                    quantity={quantity}
                    setQuantity={setQuantity}
                />

                <div className="flex justify-between items-center pt-3 border-t border-zinc-700">
                    <span className="text-zinc-300 font-medium">Total</span>
                    <div className="text-right">
                        {isFree ? (
                            <span className="text-2xl font-bold text-emerald-400">Free</span>
                        ) : (
                            <>
                                <span className="text-2xl font-bold text-white">
                                    Birr {totalPrice}
                                </span>
                                <div className="text-sm text-zinc-400">
                                    {quantity} ticket{quantity > 1 ? 's' : ''}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {!isFree && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-indigo-400" />
                        Choose Payment Method
                    </h3>

                    <div className="grid gap-3">
                        {/* Stripe Payment */}
                        <Button
                            onClick={() => handlePaymentSelect('stripe')}
                            disabled={isProcessing}
                            variant="outline"
                            className={`h-14 w-full border-2 rounded-xl transition-all duration-300 group ${
                                selectedPayment === 'stripe'
                                    ? 'border-indigo-500 bg-indigo-500/10'
                                    : 'border-zinc-700 bg-zinc-800/50 hover:border-indigo-400'
                            }`}
                        >
                            <div className="flex items-center gap-3 w-full">
                                <NextImage
                                    src="/images/stripe/Stripe wordmark - Blurple - Small.png"
                                    alt="Stripe"
                                    width={60}
                                    height={20}
                                    className="opacity-90"
                                />
                                <div className="flex-1 text-left">
                                    <div className="text-white font-medium group-hover:text-zinc-900">
                                        Pay with Stripe
                                    </div>
                                    <div className="text-zinc-400 text-xs">Secure card payment</div>
                                </div>
                                {selectedPayment === 'stripe' && (
                                    <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                                )}
                            </div>
                        </Button>

                        <Button
                            asChild
                            onClick={() => handlePaymentSelect('chapa')}
                            disabled={isProcessing}
                            variant="outline"
                            className={`h-14 w-full border-2 rounded-xl transition-all duration-300 group ${
                                selectedPayment === 'chapa'
                                    ? 'border-indigo-500 bg-indigo-500/10'
                                    : 'border-zinc-700 bg-zinc-800/50 hover:border-indigo-400'
                            }`}
                        >
                            <NextLink
                                href={`${APP_ROUTES.events.base}/${event.id}/checkout?${buildCheckoutParams('chapa')}`}
                                className="flex items-center gap-3 w-full"
                            >
                                <NextImage
                                    src="/images/chapa/chapa_no_text.svg"
                                    width={32}
                                    height={32}
                                    alt="Chapa"
                                    className="opacity-90"
                                />
                                <div className="flex-1 text-left">
                                    <div className="text-white font-medium group-hover:text-zinc-900">
                                        Pay with Chapa
                                    </div>
                                    <div className="text-zinc-400 text-xs">
                                        Local payment methods
                                    </div>
                                </div>
                                {selectedPayment === 'chapa' && (
                                    <CheckCircle2 className="w-5 h-5 text-indigo-400" />
                                )}
                            </NextLink>
                        </Button>
                    </div>
                </div>
            )}

            <div className="space-y-3">
                {isFree ? (
                    <Button
                        onClick={handleReserveFreeSpot}
                        disabled={isProcessing}
                        className="relative h-14 w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold rounded-xl transition-all duration-300 group overflow-hidden"
                    >
                        {isProcessing ? (
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                <span>Processing...</span>
                            </div>
                        ) : (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700" />
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <CheckCircle2 className="w-5 h-5" />
                                    Reserve Free Spot
                                </span>
                            </>
                        )}
                    </Button>
                ) : (
                    <Button
                        onClick={() => setSelectedPayment(null)}
                        disabled={!selectedPayment || isProcessing}
                        className="relative h-14 w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all duration-300 group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? (
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                <span>Processing...</span>
                            </div>
                        ) : (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700" />
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    <Lock className="w-5 h-5" />
                                    {selectedPayment
                                        ? `Pay with ${selectedPayment === 'stripe' ? 'Stripe' : 'Chapa'}`
                                        : 'Select Payment Method'}
                                </span>
                            </>
                        )}
                    </Button>
                )}

                <div className="flex items-center justify-center gap-2 text-zinc-500 text-sm">
                    <Lock className="w-4 h-4" />
                    <span>Secure payment · Encrypted connection</span>
                </div>
            </div>
        </div>
    );
}
