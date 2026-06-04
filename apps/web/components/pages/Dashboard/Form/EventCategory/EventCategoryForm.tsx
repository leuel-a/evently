import type {FormHTMLAttributes, ComponentProps} from 'react';
import {useFormContext, Controller} from 'react-hook-form';
import type {SubmitHandler} from 'react-hook-form';
import NextLink from 'next/link';
import {Button} from '@/components/ui/button';
import {Field, FieldLabel, FieldError} from '@/components/ui/field';
import {Input} from '@/components/ui/input';
import {Separator} from '@/components/ui/separator';
import {Textarea} from '@/components/ui/textarea';
import {APP_ROUTES} from '@/config/routes';
import {cn} from '@/lib/utils';

export type EventCategorySchemaType = {
    name: string;
    description: string;
};

export type DefaultFormProps = FormHTMLAttributes<HTMLFormElement>;

export interface EventCategoryFormProps extends Omit<DefaultFormProps, 'onSubmit'> {
    onSubmit?: SubmitHandler<EventCategorySchemaType>;
    SubmitButtonProps?: ComponentProps<typeof Button>;
    defaultValues?: EventCategorySchemaType;
}

export function EventCategoryForm(props: EventCategoryFormProps) {
    const formProps = sanitizeProps(props);
    const form = useFormContext<EventCategorySchemaType>();

    return (
        <form
            onSubmit={props.onSubmit ? form.handleSubmit(props.onSubmit) : undefined}
            className="space-y-10"
            {...formProps}
        >
            <div className="flex flex-col gap-4 border border-input group hover:border-indigo-100 px-8 py-4 rounded">
                <div>
                    <span className="text-2xl font-medium">Category Details</span>
                    <p className="text-gray-500">Basic information about the event category</p>
                </div>
                <Separator className="group-hover:bg-indigo-100" />
                <div className="space-y-4">
                    <Controller
                        control={form.control}
                        name="name"
                        render={({field, fieldState}) => (
                            <Field>
                                <FieldLabel>Name</FieldLabel>
                                <Input
                                    {...field}
                                    className={cn('h-12 rounded border shadow-none')}
                                    placeholder="e.g. Music, Sports, Technology..."
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
                                    placeholder="Describe what kind of events fall under this category"
                                    rows={5}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>
            </div>

            <div>
                {form.formState.errors?.root && (
                    <div className="text-sm text-red-500">
                        {form.formState.errors.root?.serverError?.message ?? ''}
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

export const sanitizeProps = (props: EventCategoryFormProps) => {
    const {onSubmit, defaultValues, SubmitButtonProps, ...defaultFormProps} = props;
    return defaultFormProps;
};
