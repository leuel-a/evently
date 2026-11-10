import { MutationFunction } from '@tanstack/react-query';
import { InitializeChapaAcceptPaymentApiResponse } from '@/types/payments';
import { CheckoutSchemaType } from '@/lib/db/schema';
import { makeApiCall } from '@/config/api';
import { API_ROUTES } from '@/config/routes';

export const initializeChapaAcceptPaymentMutation: MutationFunction<
    InitializeChapaAcceptPaymentApiResponse,
    CheckoutSchemaType
> = (input) => {
    return makeApiCall({
        url: `${API_ROUTES.public.payments.chapa.initializeAcceptPayment}`,
        method: 'POST',
        body: JSON.stringify(input),
    });
};
