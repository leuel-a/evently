import {Datepicker, type DatepickerProps} from '../Datepicker';

export function FormDatepicker(props: FormDatepickerProps) {
    return (
        <Datepicker
            {...props}
            disabled={(date: Date) => date > new Date() || date < new Date('1900-01-01')}
        />
    );
}

export type FormDatepickerProps = DatepickerProps & {
    source: string;
};
