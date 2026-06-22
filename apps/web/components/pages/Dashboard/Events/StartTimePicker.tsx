import {ControllerFieldState, ControllerRenderProps} from 'react-hook-form';
import {TimePicker} from '@/components/blocks/TimePicker';
import {EventSchemaType} from '@/lib/db/schema';
import {Field, FieldError, FieldLabel} from '@/components/ui/field';

interface StartTimePickerProps {
    field: ControllerRenderProps<EventSchemaType, 'startTime'>;
    fieldState: ControllerFieldState;
}

export function StartTimePicker(props: StartTimePickerProps) {
    const {field, fieldState} = props;
    return (
        <Field className="flex-1">
            <FieldLabel>End Time</FieldLabel>
            <TimePicker InputProps={{...field}} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    );
}
