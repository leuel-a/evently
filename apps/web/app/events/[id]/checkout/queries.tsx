import { MutationFunction } from '@tanstack/react-query';
import { InitializeChapaAcceptPaymentApiResponse } from '@/types/payments';
import { CheckoutSchemaType } from '@/lib/db/schema';
import { makeApiCall } from '@/config/api';
import { API_ROUTES } from '@/config/routes';

export interface InitializeChapaAcceptPaymentPayload
    extends Omit<CheckoutSchemaType, 'quantity'> {
    amount: number
}

export const initializeChapaAcceptPaymentMutation: MutationFunction<
    InitializeChapaAcceptPaymentApiResponse,
    InitializeChapaAcceptPaymentPayload
> = (input) => {
    return makeApiCall({
        url: `${API_ROUTES.public.payments.chapa.initializeAcceptPayment}`,
        method: 'POST',
        body: JSON.stringify(input),
    });
};
