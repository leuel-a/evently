import NextLink from 'next/link';

export function Footer() {
    return (
        <footer className="h-40 bg-indigo-500 text-white flex flex-col items-center justify-center">
            <nav className="mb-2">
                <NextLink
                    href="#"
                    className="mx-2 hover:underline"
                >
                    Home
                </NextLink>
                <NextLink
                    href="#"
                    className="mx-2 hover:underline"
                >
                    Events
                </NextLink>
                <NextLink
                    href="#"
                    className="mx-2 hover:underline"
                >
                    About
                </NextLink>
                <NextLink
                    href="#"
                    className="mx-2 hover:underline"
                >
                    Contact
                </NextLink>
            </nav>
            <p className="text-sm">
                &copy; {new Date().getFullYear()} Evently. All rights reserved.
            </p>
        </footer>
    );
}
