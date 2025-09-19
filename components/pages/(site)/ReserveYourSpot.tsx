'use client';

import * as React from 'react';
import {Plus, Minus} from 'lucide-react';
import {motion} from 'motion/react';
import NextImage from 'next/image';
import type {Events} from '@/app/generated/client';
import {Button} from '@/components/ui/button';

export interface ReserveYourSpotProps {
    event: Events;
}

export function ReserveYourSpot({event}: ReserveYourSpotProps) {
    const [quantity, setQuantity] = React.useState<number>(1);
    const increaseQuantity = () => setQuantity((prev) => prev + 1);
    const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
    const [openReserveButton, setOpenReserveButton] = React.useState<boolean>(false);
    const toggleReserveButton = () => setOpenReserveButton((prev) => !prev);

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4}}
            className="w-full xl:max-w-md mx-auto bg-white shadow-lg rounded p-6 space-y-4"
        >
            <h2 className="text-xl font-semibold">Reserve Your Spot</h2>
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span>Event Ticket Quantity</span>
                    <div className="text flex items-center gap-2">
                        <Button
                            variant="outline"
                            onClick={decreaseQuantity}
                            className="hover:bg-indigo-500 hover:text-white"
                        >
                            <Minus />
                        </Button>
                        <span className="mx-2">{quantity}</span>
                        <Button
                            variant="outline"
                            onClick={increaseQuantity}
                            className="hover:bg-indigo-500 hover:text-white"
                        >
                            <Plus />
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{`Birr ${event.price * quantity}`}</span>
                </div>
            </div>
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Choose Payment Method</h3>

                {openReserveButton && (
                    <div className="grid gap-3">
                        <Button
                            variant="outline"
                            className="flex h-12 items-center w-full border rounded px-4 py-3 hover:bg-gray-50 transition"
                        >
                            <NextImage
                                src="/images/stripe/Stripe wordmark - Blurple - Small.png"
                                alt="Stripe"
                                width={50}
                                height={50}
                            />
                            <span className="flex items-center gap-2">Pay with Stripe</span>
                        </Button>

                        <Button
                            variant="outline"
                            className="flex items-center h-12 w-full border rounded px-4 py-3 hover:bg-gray-50 transition"
                        >
                            <NextImage
                                src="/images/chapa/chapa_no_text.svg"
                                width={40}
                                height={40}
                                alt="Chapa"
                            />
                            <span className="flex items-center gap-2">Pay with Chapa</span>
                        </Button>
                    </div>
                )}
            </div>
            <Button
                onClick={() => toggleReserveButton()}
                className="h-12 w-full"
            >
                Reserve Your Spot
            </Button>
        </motion.div>
    );
}
