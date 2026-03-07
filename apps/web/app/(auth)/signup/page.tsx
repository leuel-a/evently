import NextLink from 'next/link';
import {APP_ROUTES} from '@/config/routes';
import {AuthFinePrint, AuthHeader, SignupForm} from '@/components/pages/Auth';

const SIGNUP_HEADER_TITLE = 'Sign up';
const SIGNUP_HEADER_SUBTITLE = 'Set up your event HQ in under a minute.';

export default function Page() {
    return (
        <div className="min-h-dvh bg-linear-to-b from-indigo-50 via-white to-indigo-50">
            <div className="mx-auto flex min-h-dvh max-w-lg items-center px-4">
                <div className="w-full">
                    <AuthHeader title={SIGNUP_HEADER_TITLE} subtitle={SIGNUP_HEADER_SUBTITLE} />
                    <SignupForm />
                    <p className="mt-6 text-center text-sm text-slate-600">
                        Already have an account?{' '}
                        <NextLink
                            href={APP_ROUTES.auth.login}
                            className="font-medium text-indigo-700 hover:text-indigo-800 underline underline-offset-4"
                        >
                            Sign in
                        </NextLink>
                    </p>
                    <AuthFinePrint />
                </div>
            </div>
        </div>
    );
}
