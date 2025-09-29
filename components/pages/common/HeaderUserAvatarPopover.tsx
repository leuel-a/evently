import type {User} from 'better-auth';
import {CircleUserRound} from 'lucide-react';
import NextLink from 'next/link';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {APP_ROUTES} from '@/config/routes';
import {LogoutUserButton} from './LogoutUserButton';

interface HeaderUserAvatarPopoverProps {
    user: User;
}

export function HeaderUserAvatarPopover({user}: HeaderUserAvatarPopoverProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="flex items-center">
                    <span className="select-none">{user.name}</span>
                    <Avatar className="w-12 h-12 aspect-square cursor-pointer">
                        <AvatarImage src={user.image ?? undefined} />
                        <AvatarFallback className="bg-transparent h-full">
                            <CircleUserRound className="text-white w-3/5 h-3/5" />
                        </AvatarFallback>
                    </Avatar>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-fit p-2 rounded-xs flex flex-col gap-2">
                <Button
                    asChild
                    variant="link"
                    className="text-right"
                >
                    <NextLink href={APP_ROUTES.dashboard.events.base}>
                        <span>Go to Dashboard</span>
                    </NextLink>
                </Button>
                <LogoutUserButton />
            </PopoverContent>
        </Popover>
    );
}
