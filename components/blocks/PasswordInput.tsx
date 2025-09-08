import {useState} from 'react';
import type {ComponentProps} from 'react';
import {Eye, EyeOff} from 'lucide-react';
import {Input} from '@/components/ui/input';

export interface PasswordInputProps extends ComponentProps<typeof Input> {}

export function PasswordInput(props: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const ICON_SIZE = 22;

    return (
        <div className="relative">
            <Input {...props} type={showPassword ? 'text' : 'password'} />
            <button
                className="absolute top-1/2 right-6 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
                type="button"
            >
                {showPassword ? <EyeOff size={ICON_SIZE} className="text-gray-400" /> : <Eye className="text-gray-400" size={ICON_SIZE} />}
            </button>
        </div>
    );
}
