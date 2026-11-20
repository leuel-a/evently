import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { EventFormActions } from './EventFormActions';
import { EventRootFormError } from './EventRootFormError';
import { EventLocationController } from './EventLocationController';
import { EventDateTimeController } from './EventDateTimeController';
import { EventBasicInformationController } from './BasicInformationController';
import { EventPricingAndCapacityController } from './EventPricingAndCapacityController';

import type { SubmitHandler } from 'react-hook-form';
import type { EventSchemaType } from '@/lib/db/schema';
import type { FormHTMLAttributes, ComponentProps } from 'react';
import type { AddressAutofillInputProps } from '@/components/blocks/Common/AddressAutofillInput';

interface EventFormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
    CustomAddressAutofillInputProps?: AddressAutofillInputProps;
    onSubmit?: SubmitHandler<EventSchemaType>;
    SubmitButtonProps?: ComponentProps<typeof Button> & { label?: string };
    defaultValues?: EventSchemaType;
    isUpdateEvent?: boolean;
}

const DEFAULT_SUBMIT_BUTTON_LABEL = 'Create';

export function EventForm(props: EventFormProps) {
    const {
        onSubmit,
        SubmitButtonProps = { label: DEFAULT_SUBMIT_BUTTON_LABEL },
        ...formProps
    } = props

    const form = useFormContext<EventSchemaType>();
    const isVirtual = form.watch('isVirtual');
    const isFree = form.watch('isFree');

    return (
        <form
            autoComplete="off"
            onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined}
            className="space-y-10"
            {...formProps}
        >
            <EventBasicInformationController formControl={form.control} />
            <EventDateTimeController formControl={form.control} />
            <EventLocationController formControl={form.control} disabled={isVirtual} />
            <EventPricingAndCapacityController formControl={form.control} disabled={isFree} />
            <EventRootFormError form={form} />
            <EventFormActions SubmitButtonProps={SubmitButtonProps} />
        </form>
    );
}
