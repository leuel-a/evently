'use client';

import {useActionState, useEffect} from 'react';
import {toast} from 'sonner';
import {logoutUserAction} from '@/app/auth/actions';
import {Button} from '@/components/ui/button';

export function LogoutUserButton() {
    const [state, formAction, pending] = useActionState(logoutUserAction, {});

    useEffect(() => {
        if (state.success === false) {
            toast('Sorry, we were unable to sign yout out');
        }
    }, [state]);

    return (
        <form action={formAction}>
            <Button
                type="submit"
                className="w-full shadow-none"
                disabled={pending}
            >
                {pending ? 'Signing you out...' : 'Sign Out'}
            </Button>
        </form>
    );
}
