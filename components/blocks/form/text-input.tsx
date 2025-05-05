import * as React from 'react';
import { useFormContext, FieldValues, FieldPath } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { FormItem, FormField, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';

export function TextInput(props: TextInputProps) {
  const { name, helperText = true, label, className: inputClassName, ...inputProps } = props;

  const form = useFormContext();

  if (!form) {
    /** if there is not form context don't throw an error instead just return nothing */
    return <></>;
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Input
                autoComplete="off"
                className={cn('h-12', inputClassName)}
                {...inputProps}
                {...field}
              />
            </FormControl>
            {helperText && <FormMessage />}
          </FormItem>
        );
      }}
    />
  );
}

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** If true, displays helper text for validation */
  helperText?: boolean;

  /** Label text to display with the input. */
  label?: string;

  /** Field name for form data, compatible with react-hook-form. */
  name: FieldPath<FieldValues>;
}
