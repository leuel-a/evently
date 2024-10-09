import Link from 'next/link';
import Image from 'next/image';
import { User } from 'next-auth';
import { signOut } from 'next-auth/react';
import avatarPlaceholder from '@/app/assets/images/avatar_placeholder.png';

// components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

// icons
import { LogOut, Settings, LayoutDashboard } from 'lucide-react';

interface UserButtonProps {
  user: User;
}

const UserButton = ({ user }: UserButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="flex-none rounded-full">
          <Image
            src={user.image || avatarPlaceholder}
            alt="User profile picture"
            className="aspect-square rounded-full bg-background object-cover"
            width={50}
            height={50}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/*TODO: change the sign out to a button to send a sign out request with the signOut function from next-auth*/}
        <DropdownMenuItem asChild>
          <button onClick={() => signOut({ callbackUrl: '/' })} className="flex w-full items-center">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
