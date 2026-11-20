import { Controller, type Control } from 'react-hook-form';
import { APP_ROUTES } from '@/config/routes';
import type { EventSchemaType } from '@/lib/db/schema';
import { ReferenceInput } from '@/components/blocks/ReferenceInput';
import { EventCategoryInput } from './EventCategoryInput'

interface EventCategoryControllerProps {
    formControl: Control<EventSchemaType>;
}

export function EventCategoryController(props: EventCategoryControllerProps) {
    const { formControl } = props;
    return (
        <Controller
            control={formControl}
            name="category"
            render={({ field }) => (
                <ReferenceInput
                    resource={APP_ROUTES.api.eventsCategory}
                    internal={true}
                >
                    <EventCategoryInput onChange={field.onChange} value={field.value} />
                </ReferenceInput>
            )}
        />
    )
}

