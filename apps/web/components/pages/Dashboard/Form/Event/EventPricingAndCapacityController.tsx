import { type Control, Controller } from 'react-hook-form';
import { EventIsFreeInput } from './EventIsFreeInput';
import { EventTicketPriceInput } from './EventTicketPriceInput';
import { EventCapacityInput } from './EventCapacityInput';
import type { EventSchemaType } from '@/lib/db/schema';

interface EventPricingAndCapacityControllerProps {
    disabled?: boolean;
    formControl: Control<EventSchemaType>
}

export function EventPricingAndCapacityController(props: EventPricingAndCapacityControllerProps) {
    const { formControl, disabled = false } = props
    return (
        <div className="flex flex-col gap-4 border border-input group hover:border-indigo-100 px-8 py-4 rounded">
            <div>
                <span className="text-2xl font-medium">Pricing & Capacity</span>
                <p className="text-gray-500">Ticket pricing and event capacity</p>
            </div>
            <div className="space-y-4">
                <Controller
                    control={formControl}
                    name="isFree"
                    render={({ field, fieldState }) => (
                        <EventIsFreeInput field={field} fieldState={fieldState} />
                    )}
                />
                <div className="flex gap-2">
                    <Controller
                        control={formControl}
                        name="ticketPrice"
                        render={({ field, fieldState }) => (
                            <EventTicketPriceInput
                                disabled={disabled}
                                field={field}
                                fieldState={fieldState}
                            />
                        )}
                    />
                    <Controller
                        control={formControl}
                        name="capacity"
                        render={({ field, fieldState }) => (
                            <EventCapacityInput field={field} fieldState={fieldState} />
                        )}
                    />
                </div>
            </div>
        </div>
    )
}

