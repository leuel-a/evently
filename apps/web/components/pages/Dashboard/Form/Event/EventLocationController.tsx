import { type Control, Controller } from 'react-hook-form'
import { EventIsVirtualInput } from './EventIsVirtualInput'
import { EventLocationInput } from './EventLocationInput'
import { CountriesSelectInput } from '@/components/pages/Common';
import type { EventSchemaType } from '@/lib/db/schema';

interface EventLocationControllerProps {
    formControl: Control<EventSchemaType>;
    disabled?: boolean
}

export function EventLocationController(props: EventLocationControllerProps) {
    const { disabled = false, formControl } = props
    return (
        <div className="flex flex-col gap-4 border border-input group hover:border-indigo-100 px-8 py-4 rounded">
            <div>
                <span className="text-2xl font-medium">Location</span>
                <p className="text-gray-500">Where is your event taking place?</p>
            </div>
            <div className="space-y-4">
                <Controller
                    control={formControl}
                    name="isVirtual"
                    render={({ field, fieldState }) => (
                        <EventIsVirtualInput field={field} fieldState={fieldState} />
                    )}
                />
                <div className="flex gap-2">
                    <Controller
                        control={formControl}
                        name="location"
                        render={({ field, fieldState }) => (
                            <EventLocationInput
                                field={field}
                                fieldState={fieldState}
                                CustomAddressAutofillInputProps={{
                                    InputProps: { disabled },
                                }}
                            />
                        )}
                    />
                    <Controller
                        control={formControl}
                        name="country"
                        render={({ field, fieldState }) => (
                            <CountriesSelectInput field={field} fieldState={fieldState} />
                        )}
                    />
                </div>
            </div>
        </div>
    )
}
