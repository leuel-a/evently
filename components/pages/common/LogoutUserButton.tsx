'use client';

import {useActionState, useEffect} from 'react';
import {LogOut, Loader2} from 'lucide-react';
import {toast} from 'sonner';
import {logoutUserAction} from '@/app/auth/actions';
import {Button} from '@/components/ui/button';
import {cn} from '@/lib/utils';

interface LogoutUserButtonProps {
    children?: React.ReactNode;
    className?: string;
}

export function LogoutUserButton({children, className}: LogoutUserButtonProps) {
    const [state, formAction, pending] = useActionState(logoutUserAction, {});

    useEffect(() => {
        if (state.success === false) {
            toast.error('Unable to sign out', {
                description: 'Please try again in a moment.',
                duration: 4000,
            });
        }
    }, [state]);

    return (
        <form
            action={formAction}
            className="w-full"
        >
            <Button
                type="submit"
                variant="ghost"
                disabled={pending}
                className={cn(
                    'w-full justify-start gap-3 h-11 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-300 group relative overflow-hidden',
                    className,
                )}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700" />

                {pending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                )}

                <span className="relative z-10 font-medium">
                    {pending ? 'Signing out...' : children || 'Sign Out'}
                </span>
            </Button>
        </form>
    );
}
