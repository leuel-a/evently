'use client';

import {ChevronDown, LogOut, ShieldCheck, User as UserIcon} from 'lucide-react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {getInitials} from '@/utils/functions';
import type {AuthSessionData} from '@/types/auth';
import {cn} from '@/lib/utils';

interface UserAvatarMenuProps {
    data: AuthSessionData;
    onProfile?: () => void;
    onSignOut?: () => void;
    className: string;
}

export function UserAvatarMenu({data, onProfile, onSignOut, className}: UserAvatarMenuProps) {
    const {user} = data;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={cn(
                        'flex w-full items-center gap-3 rounded-xl border bg-background px-3 py-3 text-left transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
                        className,
                    )}
                >
                    <Avatar className="h-10 w-10 shrink-0">
                        <AvatarImage src={user.image ?? ''} alt={user.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>

                    <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium leading-none">{user.name}</p>
                        <p className="mt-1 truncate text-xs text-muted-foreground">{user.email}</p>
                    </div>

                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" side="bottom" className="w-72" sideOffset={8}>
                <DropdownMenuLabel className="p-0">
                    <div className="flex items-center gap-3 px-2 py-2">
                        <Avatar className="h-10 w-10 shrink-0">
                            <AvatarImage src={user.image ?? ''} alt={user.name} />
                            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                            <p className="truncate text-sm font-medium">{user.name}</p>
                            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                        </div>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={onProfile}>
                    <UserIcon className="mr-2 h-4 w-4" />
                    Profile
                </DropdownMenuItem>

                <DropdownMenuItem disabled>
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    {user.emailVerified ? 'Email verified' : 'Email not verified'}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={onSignOut}
                    className="text-destructive focus:text-destructive"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
