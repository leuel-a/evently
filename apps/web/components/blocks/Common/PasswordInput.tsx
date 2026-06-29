'use client';

import {useState, type ComponentProps} from 'react';
import {EyeIcon, EyeClosedIcon} from 'lucide-react';
import {Input} from '@/components/ui/input';
import {cn} from '@/lib/utils';
import {Button} from '@/components/ui/button';

interface PasswordInputProps extends ComponentProps<typeof Input> {
    ContainerProps?: ComponentProps<'div'>;
}

export function PasswordInput(props: PasswordInputProps) {
    const {className, type, ContainerProps = {}, ...customProps} = props;
    const {className: containerClassName, ...containerProps} = ContainerProps;
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleClick = () => setShowPassword((prev) => !prev);

    return (
        <div
            tabIndex={0}
            className={cn(
                'flex shadow-xs items-center border rounded border-input pr-2 ', 
                'focus-within:border-ring focus-within:ring-indigo-500 focus-within:ring-[3px]',
                containerClassName
            )}
            {...containerProps}
        >
            <Input
                type={!showPassword ? 'password' : 'text'}
                className={cn(
                    'border-none focus-visible:border-none focus-visible:ring-0',
                    className,
                )}
                {...customProps}
            />
            <Button
                onClick={handleClick}
                type="button"
                variant="ghost"
                size="icon-sm"
                className="cursor-pointer"
            >
                {showPassword && <EyeClosedIcon size={18} className="text-gray-500" />}
                {!showPassword && <EyeIcon size={18} className="text-gray-500" />}
            </Button>
        </div>
    );
}
