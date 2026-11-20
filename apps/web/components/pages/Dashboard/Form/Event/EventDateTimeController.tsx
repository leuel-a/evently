import { Control, Controller } from 'react-hook-form';
import { Separator } from '@/components/ui/separator';
import { EndTimePicker, StartTimePicker } from '../../Events';
import { FormDatepicker } from '@/components/blocks/Form/FormDatepicker';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import type { EventSchemaType } from '@/lib/db/schema';


interface EventDateTimeControllerProps {
    formControl: Control<EventSchemaType>;
}

export function EventDateTimeController(props: EventDateTimeControllerProps) {
    const { formControl } = props;

    return (
        <div className="flex flex-col gap-4 border border-input group hover:border-indigo-100 px-8 py-4 rounded">
            <div>
                <span className="text-2xl font-medium">Date & Time</span>
                <p className="text-gray-500">When is your event happening?</p>
            </div>
            <Separator className="group-hover:bg-indigo-100" />
            <div className="flex flex-col gap-4">
                <Controller
                    control={formControl}
                    name="date"
                    render={({ field, fieldState }) => (
                        <Field className="w-full xl:w-1/3">
                            <FieldLabel>Date</FieldLabel>
                            <FormDatepicker
                                source="date"
                                selected={field.value}
                                onSelect={field.onChange}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <div className="flex flex-row justify-between gap-2">
                    <Controller
                        control={formControl}
                        name="startTime"
                        render={({ field, fieldState }) => (
                            <StartTimePicker field={field} fieldState={fieldState} />
                        )}
                    />
                    <Controller
                        control={formControl}
                        name="endTime"
                        render={({ field, fieldState }) => (
                            <EndTimePicker field={field} fieldState={fieldState} />
                        )}
                    />
                </div>
            </div>
        </div>)
}
