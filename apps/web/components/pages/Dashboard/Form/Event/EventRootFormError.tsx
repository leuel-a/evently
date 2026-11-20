import lodashGet from 'lodash/get'
import type { UseFormReturn } from 'react-hook-form';
import type { EventSchemaType } from '@/lib/db/schema';

interface EventRootFormErrorProps {
    form: UseFormReturn<EventSchemaType>
}

export function EventRootFormError(props: EventRootFormErrorProps) {
    const { form } = props;
    return (
        <div>
            {form.formState.errors?.root && (
                <div className="text-sm">
                    {lodashGet(form.formState?.errors, 'root.serverError.message', '')}
                </div>
            )}
        </div>
    )
}
