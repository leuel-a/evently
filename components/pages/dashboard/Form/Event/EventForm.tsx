import type {FormHTMLAttributes, ComponentProps} from 'react';
import {useFormContext} from 'react-hook-form';
import type {SubmitHandler} from 'react-hook-form';
import lodashGet from 'lodash/get';
import {CountriesSelectInput} from '@/components/CountriesSelectInput';
import {AddressAutofillInput} from '@/components/blocks/AddressAutofillInput';
import type {AddressAutofillInputProps} from '@/components/blocks/AddressAutofillInput';
import {BooleanInput} from '@/components/blocks/BooleanInput';
import {FormDatepicker} from '@/components/blocks/FormDatepicker';
import {FormLabel} from '@/components/blocks/FormLabel';
import {ReferenceInput} from '@/components/blocks/ReferenceInput';
import {Button} from '@/components/ui/button';
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormMessage,
    FormDescription,
} from '@/components/ui/form';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {TimePicker} from '@/components/ui/time-picker';
import {API_ROUTES} from '@/config/routes';
import type {EventSchemaType} from '@/lib/db/schema';
import {cn} from '@/lib/utils';
import {EventCategoryInput} from './EventCategoryInput';

export type DefaultFormProps = FormHTMLAttributes<HTMLFormElement>;

export interface EventFormProps extends Omit<DefaultFormProps, 'onSubmit'> {
    CustomAddressAutofillInputProps?: AddressAutofillInputProps;
    onSubmit?: SubmitHandler<EventSchemaType>;
    SubmitButtonProps?: ComponentProps<typeof Button>;
    defaultValues?: EventSchemaType;
}

export function EventForm(props: EventFormProps) {
    const formProps = sanitizeProps(props);
    const form = useFormContext<EventSchemaType>();

    return (
        <Form {...form}>
            <form
                onSubmit={props.onSubmit ? form.handleSubmit(props.onSubmit) : undefined}
                className="space-y-4"
                {...formProps}
            >
                <FormField
                    control={form.control}
                    name="title"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    className={cn('h-12 rounded border shadow-none')}
                                    placeholder="Make the title slick 😉"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    {...field}
                                    className={cn('h-32 rounded shadow-none')}
                                    placeholder="Describe your event in detail"
                                    rows={20}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="isVirtual"
                    render={({field}) => (
                        <FormItem className="flex flex-row items-center justify-between rounded border p-3">
                            <div className="space-y-1">
                                <FormLabel>Virtual Event</FormLabel>
                                <FormDescription>
                                    Enable this if your event will be held online (virtual event).
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
                <div className="flex flex-col gap-4 xl:flex-row xl:gap-2">
                    <FormField
                        control={form.control}
                        name="date"
                        render={({field}) => (
                            <FormItem className="w-full xl:w-1/3">
                                <FormLabel>Date</FormLabel>
                                <FormControl>
                                    <FormDatepicker
                                        source="date"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="startTime"
                        render={({field}) => (
                            <FormItem className="w-full xl:w-1/3">
                                <FormLabel>Start Time</FormLabel>
                                <FormControl>
                                    <TimePicker {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="endTime"
                        render={({field}) => (
                            <FormItem className="w-full xl:w-1/3">
                                <FormLabel>End Time</FormLabel>
                                <FormControl>
                                    <TimePicker {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="category"
                    render={({field}) => (
                        <ReferenceInput resource={API_ROUTES.eventCategory.base}>
                            <EventCategoryInput
                                onChange={field.onChange}
                                value={field.value}
                            />
                        </ReferenceInput>
                    )}
                />
                <FormField
                    control={form.control}
                    name="address"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <AddressAutofillInput
                                    InputProps={{...field, className: 'h-12'}}
                                    {...props.CustomAddressAutofillInputProps}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col gap-4 xl:grid xl:grid-cols-2 xl:gap-2">
                    <FormField
                        control={form.control}
                        name="country"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <CountriesSelectInput
                                        onChange={field.onChange}
                                        value={field.value ?? ''}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Enter the city"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div>
                    <FormField
                        control={form.control}
                        name="capacity"
                        render={({field}) => (
                            <FormItem className="w-full lg:w-1/3">
                                <FormLabel required={false}>Capacity</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        {...field}
                                        placeholder="What is your expected attendance?"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div>
                    {form.formState.errors?.root && (
                        <FormMessage className="text-sm">
                            {lodashGet(form.formState?.errors, 'root.serverError.message', '')}
                        </FormMessage>
                    )}
                </div>
                <div className="mt-10 flex justify-end xl:justify-start">
                    <Button
                        type="submit"
                        className="h-12 w-80 cursor-pointer"
                        {...props.SubmitButtonProps}
                    >
                        Create
                    </Button>
                </div>
            </form>
        </Form>
    );
}

export const sanitizeProps = (props: EventFormProps) => {
    const {
        CustomAddressAutofillInputProps,
        onSubmit,
        defaultValues,
        SubmitButtonProps,
        ...defaultFormProps
    } = props;
    return defaultFormProps;
};
