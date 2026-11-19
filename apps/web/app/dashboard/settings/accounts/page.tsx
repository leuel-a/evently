import { AccountConnectionsSection } from '@/components/pages/Dashboard/Settings';
import { getLinkedAccounts } from './actions';

export default async function Page() {
    const {
        success: getAccountsPageDataSuccess,
        data: linkedAccountsData
    } = await getLinkedAccounts();

    return (
        <div className="max-w-7xl space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight">Account settings</h1>
                <p className="text-sm text-muted-foreground">
                    Manage how your account connects with external providers.
                </p>
            </div>

            {(getAccountsPageDataSuccess && linkedAccountsData) && (
                <AccountConnectionsSection
                    linkedAccounts={linkedAccountsData.linkedAccounts.data}
                />
            )}
        </div>
    );
}
