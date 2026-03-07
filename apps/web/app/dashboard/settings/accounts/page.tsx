'use client';

import {useQuery, type QueryFunction} from '@tanstack/react-query';
import {API_ROUTES} from '@/config/routes';
import {AccountConnectionsSection} from '@/components/pages/Dashboard/Settings/Accounts/AccountConnectionsSection';
import {LinkedAccountsResponse} from '@/components/pages/Dashboard/Settings/Accounts/types';

const getMyLinkedAccounts: QueryFunction<LinkedAccountsResponse> = async () => {
    const response = await fetch(API_ROUTES.users.linkedAccounts);
    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }
    return response.json();
};

export default function Page() {
    const {data: linkedAccountsData} = useQuery({
        queryKey: ['user-accounts'],
        queryFn: getMyLinkedAccounts,
    });

    async function handleConnect() {}

    return (
        <div className="max-w-7xl space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Account settings</h1>
                <p className="text-sm text-muted-foreground">
                    Manage how your account connects with external providers.
                </p>
            </div>

            {linkedAccountsData && (
                <AccountConnectionsSection data={linkedAccountsData} onConnect={handleConnect} />
            )}
        </div>
    );
}
