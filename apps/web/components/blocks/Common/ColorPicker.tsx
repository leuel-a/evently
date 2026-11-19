import * as React from 'react';
import { HexColorPicker } from 'react-colorful'

export interface ColorPickerProps
    extends Omit<React.ComponentProps<'div'>, 'onChange' | 'defaultValue'> {
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
}

export function ColorPicker(props: ColorPickerProps) {
    const {
        onChange,
        defaultValue = '#000000',
        ref,
        value,
        ...rest
    } = props

    const [internal, setInternal] = React.useState<string>(defaultValue);
    const isControlled = value !== undefined;
    const color = isControlled ? value : internal;

    const handleChange = (next: string) => {
        if (!isControlled) setInternal(next)
        onChange?.(next)
    };

    return (
        <div ref={ref} {...rest}>
            <HexColorPicker color={color} onChange={handleChange} />
        </div>
    )
}

