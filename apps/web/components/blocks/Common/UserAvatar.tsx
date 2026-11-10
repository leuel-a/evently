import {GetSessionResult} from '@/app/dashboard/actions';
import {getInitials} from '@/utils/functions';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

interface IUserAvatar {
    user: NonNullable<GetSessionResult['user']>;
}

export function UserAvatar(props: IUserAvatar) {
    const {user} = props;
    return (
        <Avatar className="h-10 w-10 shrink-0">
            <AvatarImage src={user.image ?? ''} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
    );
}
