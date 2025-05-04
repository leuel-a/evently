import * as React from 'react';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';

import { cn } from '@/lib/utils';

export interface LinkProps extends NextLinkProps,
	Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps> {
}

export function Link(props: LinkProps) {
	const { className, children, ...linkProps } = props

	return (
		<NextLink
			className={cn('text-white', className)}
			{...linkProps}
		>
			{children}
		</NextLink>
	);
}


