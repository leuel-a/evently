import {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {APP_ROUTES} from '@/config/routes';
import authClient from '@/lib/auth-client';

export function HeaderUserAvatarPopover() {
    const router = useRouter();
    const [signingOut, setSigningOut] = useState<boolean>(false);

    const logoutHandler = async () => {
        setSigningOut(true);
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push(APP_ROUTES.index.home);
                    setSigningOut(false);
                },
                onError: () => {
                    setSigningOut(false);
                },
            },
        });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Avatar className="w-12 h-12 aspect-square">
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
                <Button
                    onClick={logoutHandler}
                    className="w-full shadow-none"
                    disabled={signingOut}
                >
                    {signingOut ? 'Signing you out...' : 'Sign Out'}
                </Button>
            </PopoverContent>
        </Popover>
    );
}
