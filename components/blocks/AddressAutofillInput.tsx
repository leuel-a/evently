import * as React from 'react';
import {FieldError} from 'react-hook-form';
import dynamic from 'next/dynamic';
import {Input} from '@/components/ui/input';
import {cn} from '@/lib/utils';

//
// INFO: Mapbox.AddressAutofill does not support SSR, so we need to dynamically import it for it to work with next.js
const AddressAutofill = dynamic(() => import('@mapbox/search-js-react').then((mapbox) => mapbox.AddressAutofill), {ssr: false});

export function AddressAutofillInputComponent(props: AddressAutofillInputProps) {
    const {error, InputProps: inputProps} = props;
    return (
        <AddressAutofill accessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY as string}>
            <Input
                {...inputProps}
                autoComplete="street-address"
                className={cn(error ? 'border-red-500' : '')}
                placeholder="Enter address"
            />
        </AddressAutofill>
    );
}

export const AddressAutofillInput = React.memo(
    AddressAutofillInputComponent,
    (prev, next) => prev.error?.message === next.error?.message && JSON.stringify(prev.InputProps) === JSON.stringify(next.InputProps),
);

export interface AddressAutofillInputProps {
    error?: FieldError;
    InputProps?: React.ComponentProps<typeof Input>;
}
