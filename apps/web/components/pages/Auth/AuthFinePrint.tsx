import NextLink from 'next/link';

export function AuthFinePrint() {
    return (
        <p className="mt-2 text-center text-xs text-slate-500">
            By continuing, you agree to our{' '}
            <NextLink className="underline underline-offset-4 hover:text-slate-700" href="/terms">
                Terms
            </NextLink>{' '}
            and{' '}
            <NextLink className="underline underline-offset-4 hover:text-slate-700" href="/privacy">
                Privacy Policy
            </NextLink>
            .
        </p>
    );
}
