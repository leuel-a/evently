import {useFormContext} from 'react-hook-form';
import type {EventSchemaType} from './schema';

export const useCreateEventFormContext = () => {
    return useFormContext<EventSchemaType>();
};
