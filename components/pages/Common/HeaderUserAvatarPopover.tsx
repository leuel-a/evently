import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

export function HeaderUserAvatarPopover() {
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
