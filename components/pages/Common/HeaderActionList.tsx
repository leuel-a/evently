import Link from 'next/link';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {APP_ROUTES} from '@/config/routes';
import {useAuthContext} from '@/context/AuthContext';

export function HeaderActionList() {
    const {isAuthenticated} = useAuthContext();

    if (isAuthenticated) {
        return (
            <Popover>
                <PopoverTrigger asChild>
                    <Avatar className="w-12 h-12 aspect-square">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-fit">
                    <ul>
                        <li></li>
                    </ul>
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <div>
            <Button className="text-md h-12 w-40 border border-white bg-amber-500 tracking-tight text-white/90 hover:bg-amber-500/90">
                <Link href={APP_ROUTES.auth.signup}>Sign Up</Link>
            </Button>
        </div>
    );
}
