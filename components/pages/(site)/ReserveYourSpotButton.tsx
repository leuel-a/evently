'use client';

import * as React from 'react';
import {motion} from 'motion/react';
import NextImage from 'next/image';
import {Button} from '@/components/ui/button';

export interface ReserveYourSpotButtonProps {}

export function ReserveYourSpotButton() {
    const [openReserveButton, setOpenReserveButton] = React.useState<boolean>(false);
    const toggleReserveButton = () => setOpenReserveButton((prev) => !prev);

    return (
        <React.Fragment>
            <motion.div
                className="space-y-4"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.4}}
            >
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
            </motion.div>
            <Button
                onClick={() => toggleReserveButton()}
                className="h-12 w-full"
            >
                Reserve Your Spot
            </Button>
        </React.Fragment>
    );
}
