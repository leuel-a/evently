import {ControllerFieldState, ControllerRenderProps} from 'react-hook-form';
import {TimePicker} from '@/components/blocks/TimePicker';
import {Field, FieldLabel, FieldError} from '@/components/ui/field';
import {EventSchemaType} from '@/lib/db/schema';

interface EndTimePickerProps {
    field: ControllerRenderProps<EventSchemaType, 'endTime'>;
    fieldState: ControllerFieldState;
}

export function EndTimePicker(props: EndTimePickerProps) {
    const {field, fieldState} = props;
    return (
        <Field className="flex-1">
            <FieldLabel>End Time</FieldLabel>
            <TimePicker InputProps={{...field}} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    );
}
