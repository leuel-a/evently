import {useController, useFormContext} from 'react-hook-form';
import {Datepicker, type DatepickerProps} from './Datepicker';

export function FormDatepicker(props: FormDatepickerProps) {
    const methods = useFormContext();

    if (!methods) throw new Error('FormDatepicker can only be used with in a FormContext');

    const {source, ButtonProps: buttonProps, CalendarProps: calendarProps} = props;
    const {control} = methods;

    const {
        field: {onChange},
    } = useController({
        name: source,
        control,
    });

    return (
        <Datepicker
            ButtonProps={{...buttonProps}}
            CalendarProps={{
                disabled: (date) => date > new Date() || date < new Date('1900-01-01'),
                ...calendarProps,
            }}
            onChange={onChange}
        />
    );
}

export interface FormDatepickerProps extends DatepickerProps {
    source: string;
}
