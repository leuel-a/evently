import * as React from 'react'
import { useFormContext, FieldValues, FieldPath } from 'react-hook-form'

import { cn } from '@/lib/utils'

import { Input } from '@/components/ui/input'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { EyeOpenIcon, EyeOffIcon } from '@/components/assets'

export function PasswordInput(props: PasswordInputProps) {
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false)

  const { helperText = true, name, label, className: inputClassName, ...inputProps } = props

  const handlePasswordVisibilityClick = () => setPasswordVisible((prev) => !prev)

  const form = useFormContext()

  if (!form) {
    /** if text input is not being used in a form context don't throw an error instead just return nothing */
    return <></>
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="relative">
              <Input
                autoComplete="off"
                {...inputProps}
                {...field}
                type={passwordVisible ? 'text' : 'password'}
                className={cn('h-12', inputClassName)}
              />
              <button
                type="button"
                onClick={handlePasswordVisibilityClick}
                className="absolute right-4 top-3 text-gray-500"
              >
                {!passwordVisible ? <EyeOffIcon /> : <EyeOpenIcon />}
              </button>
            </div>
          </FormControl>
          {helperText && <FormMessage />}
        </FormItem>
      )}
    />
  )
}

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** If true, displays helper text for validation */
  helperText?: boolean

  /** Label text to display with the input. */
  label?: string

  /** Field name for form data, compatible with react-hook-form. */
  name: FieldPath<FieldValues>
}
