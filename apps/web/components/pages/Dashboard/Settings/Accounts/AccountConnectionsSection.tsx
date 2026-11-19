'use client';

import * as React from 'react';
import { BadgeCheck, Cable, MessageCircle, Twitter, Video } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ProviderRow } from './ProviderRow';
import type { ProviderConfig, ProviderKey } from './types';
import type { GetLinkedAccountResponse } from '@/types/auth';

const PROVIDERS: ProviderConfig[] = [
    {
        id: 'google',
        label: 'Google',
        description: 'Sign in and sync with your Google account.',
        icon: BadgeCheck,
    },
    {
        id: 'zoom',
        label: 'Zoom',
        description: 'Connect Zoom for meetings and virtual event workflows.',
        icon: Video,
    },
    {
        id: 'twitter',
        label: 'Twitter',
        description: 'Link Twitter for social publishing and identity.',
        icon: Twitter,
    },
    {
        id: 'discord',
        label: 'Discord',
        description: 'Connect Discord for community and event coordination.',
        icon: MessageCircle,
    },
];

export interface AccountConnectionsSectionProps {
    linkedAccounts: NonNullable<GetLinkedAccountResponse['data']>;
    onConnect?: (provider: ProviderKey) => Promise<void> | void;
}

export function AccountConnectionsSection({ linkedAccounts, onConnect }: AccountConnectionsSectionProps) {
    const linkedProviderMap = new Map(
        linkedAccounts.map((account) => [account.providerId, account]),
    );

    return (
        <Card className="border-border/60 shadow-sm rounded">
            <CardHeader className="space-y-2">
                <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Cable className="h-4 w-4" />
                    </div>
                    <div>
                        <CardTitle className="text-base">Connected accounts</CardTitle>
                        <CardDescription>
                            Manage the external accounts linked to your profile.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-3">
                {PROVIDERS.map((provider, index) => {
                    const linkedAccount = linkedProviderMap.get(provider.id);
                    const isConnected = Boolean(linkedAccount);

                    return (
                        <React.Fragment key={provider.id}>
                            <ProviderRow
                                provider={provider}
                                isConnected={isConnected}
                                account={linkedAccount}
                                onConnect={onConnect}
                            />
                            {index < PROVIDERS.length - 1 ? <Separator /> : null}
                        </React.Fragment>
                    );
                })}
            </CardContent>
        </Card>
    );
}
