import {authClient} from '@/lib/auth';
import {Button} from '@/components/ui/button';
import {GoogleGlyph} from '../Common/GoogleGlyph';
import {SubmitEventHandler} from 'react';
import {APP_ROUTES} from '@/config/routes';

const GOOGLE_PROVIDER = 'google';

interface GoogleSignInProps {
    isOrganizer?: boolean;
}

export function GoogleSignIn(props: GoogleSignInProps) {
    const {isOrganizer = false} = props;
    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        await authClient.signIn.social({
            provider: GOOGLE_PROVIDER,
            callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}${APP_ROUTES.dashboard.events.base}`,
            additionalData: {isOrganizer},
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Button
                type="submit"
                className="w-full rounded bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
            >
                <GoogleGlyph />
                Continue with Google
            </Button>
        </form>
    );
}
