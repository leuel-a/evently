'use client';

import { useState } from 'react';
import { EventSummaryPanel } from './EventsSummaryPanel';
import { CheckoutForm } from './CheckoutForm';
import { GetEventPageResult } from '@/app/events/actions';

interface CheckoutPageProps {
    event: GetEventPageResult['data'];
}

export function CheckoutPage(props: CheckoutPageProps) {
    const { event } = props;
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="min-h-screen bg-indigo-50 flex items-center">
            <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-3 rounded">
                <EventSummaryPanel event={event} quantity={quantity} />

                <CheckoutForm event={event} quantity={quantity} onQuantityChange={setQuantity} />
            </div>
        </div>
    );
}
