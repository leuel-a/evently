export type ProviderKey = 'google' | 'zoom' | 'twitter' | 'discord';

export type ProviderConfig = {
    id: ProviderKey;
    label: string;
    description: string;
    icon: React.ComponentType<{className?: string}>;
};

export type LinkedAccount = {
    accountId: string;
    providerId: string;
};

export type LinkedAccountsResponse = {
    data: LinkedAccount[];
};
