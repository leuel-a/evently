import {useFormContext} from 'react-hook-form';
import type {EventSchemaType} from '@/lib/db/schema';

export const useEventFormContext = () => {
    return useFormContext<EventSchemaType>();
};
