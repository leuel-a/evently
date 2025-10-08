import {ArrowLeft} from 'lucide-react';
import NextLink, {LinkProps as NextLinkProps} from 'next/link';
import {cn} from '@/lib/utils';

export interface GoBackLinkProps {
    href: NextLinkProps['href'];
    label?: string | boolean;
    LinkProps?: Omit<NextLinkProps, 'href'>;
    className?: string;
}

export function GoBackLink({label, LinkProps, href, className}: GoBackLinkProps) {
    return (
        <NextLink
            className={cn(
                'group w-40 relative flex items-center gap-3 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 pl-6 text-zinc-300 hover:text-white hover:border-indigo-500 text-center py-3 rounded transition-all duration-300 overflow-hidden',
                className,
            )}
            href={href}
            {...LinkProps}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700" />
            <ArrowLeft className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1" />
            {label && (
                <span className="font-medium text-sm text-white">
                    {typeof label === 'string' ? label : 'Go Back'}
                </span>
            )}
        </NextLink>
    );
}
