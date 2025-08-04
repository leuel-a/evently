import {useFormContext} from 'react-hook-form';
import type {EventSchemaType} from '@/lib/db/schema';

export const useCreateEventFormContext = () => {
    return useFormContext<EventSchemaType>();
};
