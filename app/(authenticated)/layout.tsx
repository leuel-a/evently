import * as React from 'react';
import Header from '@/components/blocks/header';

export type AuthenticatedLayoutProps = Readonly<{ children: React.ReactNode }>

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
	return (
		<React.Fragment>
			<Header />
			{children}
		</React.Fragment>
	);
}
