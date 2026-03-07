import {authClient} from '@/lib/auth';
import {Button} from '@/components/ui/button';
import {GoogleGlyph} from '../Common/GoogleGlyph';
import {SubmitEventHandler} from 'react';
import {APP_ROUTES} from '@/config/routes';

export function GoogleSignIn() {
    const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        await authClient.signIn.social({
            provider: 'google',
            callbackURL: `${process.env.NEXT_PUBLIC_APP_URL}${APP_ROUTES.dashboard.events.base}`,
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
