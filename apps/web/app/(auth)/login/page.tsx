import NextLink from 'next/link';
import {APP_ROUTES} from '@/config/routes';
import {LoginForm, AuthFinePrint, AuthHeader} from '@/components/pages/Auth';

const LOGIN_HEADER_TITLE = 'Sign in';
const LOGIN_HEADER_SUBTITLE = 'Pick a method and jump back into your events.';

export default function Page() {
    return (
        <div className="min-h-dvh bg-linear-to-b from-indigo-50 via-white to-indigo-50">
            <div className="mx-auto flex min-h-dvh max-w-md items-center px-4">
                <div className="w-full">
                    <AuthHeader title={LOGIN_HEADER_TITLE} subtitle={LOGIN_HEADER_SUBTITLE} />
                    <LoginForm />
                    <p className="mt-6 text-center text-sm text-slate-600">
                        Don&apos;t have an account?{' '}
                        <NextLink
                            href={APP_ROUTES.auth.signup}
                            className="font-medium text-indigo-700 hover:text-indigo-800 underline underline-offset-4"
                        >
                            Create one
                        </NextLink>
                    </p>
                    <AuthFinePrint />
                </div>
            </div>
        </div>
    );
}
