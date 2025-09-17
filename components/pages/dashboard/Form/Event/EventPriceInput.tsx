import * as React from 'react';
import {BooleanInput} from '@/components/blocks/BooleanInput';
import {FormItem, FormLabel, FormField, FormDescription, FormControl} from '@/components/ui/form';
import {useEventFormContext} from './useEventFormContext';

export default function EventPriceInput() {
    const form = useEventFormContext();

    return (
        <React.Fragment>
            <FormField
                control={form.control}
                name="isFree"
                render={({field}) => (
                    <FormItem className="flex flex-row items-center justify-between rounded border p-3">
                        <div className="space-y-1">
                            <FormLabel>Event Type</FormLabel>
                            <FormDescription>
                                Select if your event is free or paid. If paid, an input will appear
                                to set the entry price.
                            </FormDescription>
                        </div>
                        <FormControl>
                            <BooleanInput
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="price"
                render={({}) => <FormItem></FormItem>}
            />
        </React.Fragment>
    );
}
