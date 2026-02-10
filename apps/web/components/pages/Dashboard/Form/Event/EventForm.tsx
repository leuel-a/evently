import type {FormHTMLAttributes, ComponentProps} from 'react';
import {useFormContext, Controller} from 'react-hook-form';
import type {SubmitHandler} from 'react-hook-form';
import lodashGet from 'lodash/get';
import NextLink from 'next/link';
import {CountriesSelectInput} from '@/components/pages/Common/CountriesSelectInput';
import {AddressAutofillInput} from '@/components/blocks/Common/AddressAutofillInput';
import type {AddressAutofillInputProps} from '@/components/blocks/Common/AddressAutofillInput';
import {BooleanInput} from '@/components/blocks/BooleanInput';
import {FormDatepicker} from '@/components/blocks/Form/FormDatepicker';
import {ReferenceInput} from '@/components/blocks/ReferenceInput';
import {Button} from '@/components/ui/button';
import {Field, FieldLabel, FieldDescription, FieldError} from '@/components/ui/field';
import {Input} from '@/components/ui/input';
import {Separator} from '@/components/ui/separator';
import {Textarea} from '@/components/ui/textarea';
import {TimePicker} from '@/components/blocks/TimePicker';
import {API_ROUTES, APP_ROUTES} from '@/config/routes';
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
        <form
            onSubmit={props.onSubmit ? form.handleSubmit(props.onSubmit) : undefined}
            className="space-y-10"
            {...formProps}
        >
            <div className="flex flex-col gap-4 border border-input group hover:border-indigo-100 px-8 py-4 rounded">
                <div>
                    <span className="text-2xl font-medium">Basic Information</span>
                    <p className="text-gray-500">Essential details about your event</p>
                </div>
                <Separator className="group-hover:bg-indigo-100" />
                <div className="space-y-4">
                    <Controller
                        control={form.control}
                        name="title"
                        render={({field, fieldState}) => (
                            <Field>
                                <FieldLabel>Title</FieldLabel>
                                <Input
                                    {...field}
                                    className={cn('h-12 rounded border shadow-none')}
                                    placeholder="Make the title slick 😉"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="description"
                        render={({field, fieldState}) => (
                            <Field>
                                <FieldLabel>Description</FieldLabel>
                                <Textarea
                                    {...field}
                                    className={cn('h-32 rounded shadow-none')}
                                    placeholder="Describe your event in detail"
                                    rows={20}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="category"
                        render={({field}) => (
                            <ReferenceInput resource={API_ROUTES.eventCategory.base}>
                                <EventCategoryInput onChange={field.onChange} value={field.value} />
                            </ReferenceInput>
                        )}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4 border border-input group hover:border-indigo-100 px-8 py-4 rounded">
                <div>
                    <span className="text-2xl font-medium">Location</span>
                    <p className="text-gray-500">Where is your event taking place?</p>
                </div>
                <div className="space-y-4">
                    <Controller
                        control={form.control}
                        name="isVirtual"
                        render={({field, fieldState}) => (
                            <Field
                                data-invalid={fieldState.invalid}
                                className="flex flex-row items-center justify-between rounded border p-3"
                            >
                                <div className="space-y-1">
                                    <FieldLabel>Virtual Event</FieldLabel>
                                    <FieldDescription>
                                        Enable this if your event will be held online (virtual
                                        event).
                                    </FieldDescription>
                                </div>
                                <BooleanInput
                                    aria-invalid={fieldState.invalid}
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </Field>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name="address"
                        render={({field, fieldState}) => (
                            <Field>
                                <FieldLabel>Address</FieldLabel>
                                <AddressAutofillInput
                                    InputProps={{
                                        ...field,
                                        className: 'h-12',
                                        'aria-invalid': fieldState.invalid,
                                    }}
                                    {...props.CustomAddressAutofillInputProps}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <div className="flex flex-col gap-4 xl:grid xl:grid-cols-2 xl:gap-2">
                        <Controller
                            control={form.control}
                            name="country"
                            render={({field, fieldState}) => (
                                <Field>
                                    <FieldLabel>Country</FieldLabel>
                                    <CountriesSelectInput
                                        onChange={field.onChange}
                                        value={field.value ?? ''}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name="city"
                            render={({field, fieldState}) => (
                                <Field>
                                    <FieldLabel>City</FieldLabel>
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter the city"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 border border-input group hover:border-indigo-100 px-8 py-4 rounded">
                <div>
                    <span className="text-2xl font-medium">Date & Time</span>
                    <p className="text-gray-500">When is your event happening?</p>
                </div>
                <Separator className="group-hover:bg-indigo-100" />
                <div className="flex flex-col gap-4">
                    <Controller
                        control={form.control}
                        name="date"
                        render={({field, fieldState}) => (
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
                            control={form.control}
                            name="startTime"
                            render={({field, fieldState}) => (
                                <Field className="flex-1">
                                    <FieldLabel>Start Time</FieldLabel>
                                    <TimePicker {...field} />
                                    {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name="endTime"
                            render={({field, fieldState}) => (
                                <Field className="flex-1">
                                    <FieldLabel>End Time</FieldLabel>
                                    <TimePicker {...field} />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 border border-input group hover:border-indigo-100 px-8 py-4 rounded">
                <div>
                    <span className="text-2xl font-medium">Pricing & Capacity</span>
                    <p className="text-gray-500">Ticket pricing and event capacity</p>
                </div>
                <div className="space-y-4">
                    <Controller
                        control={form.control}
                        name="isFree"
                        render={({field, fieldState}) => (
                            <Field className="flex flex-row items-center justify-between rounded border p-3">
                                <div className="space-y-1">
                                    <FieldLabel>Free Event</FieldLabel>
                                    <FieldDescription>No Charge for attendees</FieldDescription>
                                </div>
                                <BooleanInput
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </Field>
                        )}
                    />
                    <div className="flex gap-2">
                        <Controller
                            control={form.control}
                            name="price"
                            render={({field, fieldState}) => (
                                <Field className="flex-1">
                                    <FieldLabel>Ticket Price</FieldLabel>
                                    <Input
                                        aria-invalid={fieldState.invalid}
                                        type="number"
                                        {...field}
                                        placeholder="What is your expected attendance?"
                                    />
                                    <FieldDescription>
                                        Leave empty if event is free
                                    </FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            control={form.control}
                            name="capacity"
                            render={({field, fieldState}) => (
                                <Field className="flex-1">
                                    <FieldLabel>Capacity</FieldLabel>
                                    <Input
                                        type="number"
                                        {...field}
                                        placeholder="What is your expected attendance?"
                                    />
                                    <FieldDescription>Maximum number of attendees</FieldDescription>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </div>
                </div>
            </div>
            <div>
                {form.formState.errors?.root && (
                    <div className="text-sm">
                        {lodashGet(form.formState?.errors, 'root.serverError.message', '')}
                    </div>
                )}
            </div>
            <div className="flex gap-4 justify-end">
                <Button
                    type="button"
                    variant="secondary"
                    className="h-12 w-80 rounded cursor-pointer"
                    asChild
                >
                    <NextLink href={APP_ROUTES.dashboard.events.base}>Cancel</NextLink>
                </Button>
                <Button
                    type="submit"
                    className="h-12 w-80 cursor-pointer rounded bg-indigo-500 hover:bg-indigo-700/80"
                    {...props.SubmitButtonProps}
                >
                    Create
                </Button>
            </div>
        </form>
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
