'use client';

import {useActionState} from 'react';
import Link from 'next/link';
import {logoutUserAction} from '@/app/auth/actions';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {APP_ROUTES} from '@/config/routes';

export function HeaderUserAvatarPopover() {
    const [_, formAction, pending] = useActionState(logoutUserAction, undefined);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Avatar className="w-12 h-12 aspect-square cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-2 rounded-xs flex flex-col gap-2">
                <Button
                    asChild
                    variant="link"
                    className="text-right"
                >
                    <Link href={APP_ROUTES.dashboard.events.base}>Go to Dashboard</Link>
                </Button>
                <form action={formAction}>
                    <Button
                        type="submit"
                        className="w-full shadow-none"
                        disabled={pending}
                    >
                        {pending ? 'Signing you out...' : 'Sign Out'}
                    </Button>
                </form>
            </PopoverContent>
        </Popover>
    );
}
