import * as React from 'react';
import dynamic from 'next/dynamic';
import {cn} from '@/lib/utils';

import {Input} from '@/components/ui/input';
import {FieldError} from 'react-hook-form';

export function AddressAutofillInput(props: AddressAutofillInputProps) {
    const {error} = props;

    // INFO: Mapbox.AddressAutofill does not support SSR, so we need to dynamically import it for it to work with next.js
    const AddressAutofill = dynamic(() => import('@mapbox/search-js-react').then((mapbox) => mapbox.AddressAutofill), {ssr: false});

    return (
        <AddressAutofill accessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string}>
            <Input
                autoComplete="street-address"
                className={cn(error ? 'border-red-500' : '')}
                placeholder="Enter address"
            />
        </AddressAutofill>
    );
}

export interface AddressAutofillInputProps {
    error?: FieldError;
}
