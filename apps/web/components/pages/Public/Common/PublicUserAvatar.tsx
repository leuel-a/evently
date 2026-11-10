import {LogOut, ShieldCheck} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {UserAvatar} from '@/components/blocks/Common/UserAvatar';
import {GetSessionResult} from '@/app/dashboard/actions';

interface IPublicUserAvatar {
    user: NonNullable<GetSessionResult['user']>;
    onSignOut: () => void;
}
export function PublicUserAvatar(props: IPublicUserAvatar) {
    const {onSignOut, user} = props;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full border-none h-10 w-10">
                <UserAvatar user={user} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
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
