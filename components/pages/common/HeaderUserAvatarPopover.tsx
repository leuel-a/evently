'use client';

import {useActionState, useEffect} from 'react';
import Link from 'next/link';
import {toast} from 'sonner';
import {logoutUserAction} from '@/app/auth/actions';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {APP_ROUTES} from '@/config/routes';

export function HeaderUserAvatarPopover() {
    const [state, formAction, pending] = useActionState(logoutUserAction, {});

    useEffect(() => {
        if (state.success === false) {
            toast('Sorry, we were unable to sign yout out');
        }
    }, [state]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Avatar className="w-12 h-12 aspect-square cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-2 rounded-xs flex flex-col gap-2">
                <Button asChild variant="link" className="text-right">
                    <Link href={APP_ROUTES.dashboard.events.base}>Go to Dashboard</Link>
                </Button>
                <form action={formAction}>
                    <Button type="submit" className="w-full shadow-none" disabled={pending}>
                        {pending ? 'Signing you out...' : 'Sign Out'}
                    </Button>
                </form>
            </PopoverContent>
        </Popover>
    );
}
