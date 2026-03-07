import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {ConnectAccountDialog} from './ConnectAccountDialog';
import type {LinkedAccount, ProviderConfig, ProviderKey} from './types';

interface ProviderRowProps {
    provider: ProviderConfig;
    isConnected: boolean;
    account?: LinkedAccount;
    onConnect?: (provider: ProviderKey) => Promise<void> | void;
}

export function ProviderRow({provider, isConnected, account, onConnect}: ProviderRowProps) {
    const Icon = provider.icon;

    return (
        <div className="flex flex-col gap-4 py-1 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-muted/40">
                    <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium">{provider.label}</p>
                        {isConnected ? (
                            <Badge
                                variant="secondary"
                                className="rounded-md bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/10 dark:text-emerald-400"
                            >
                                Connected
                            </Badge>
                        ) : (
                            <Badge variant="outline" className="rounded-md">
                                Not connected
                            </Badge>
                        )}
                    </div>

                    <p className="text-sm text-muted-foreground">{provider.description}</p>

                    {isConnected && account ? (
                        <p className="text-xs text-muted-foreground">
                            Account ID:{' '}
                            <span className="font-mono text-foreground/80">
                                {account.accountId}
                            </span>
                        </p>
                    ) : null}
                </div>
            </div>

            <div className="shrink-0">
                {isConnected ? (
                    <Button variant="outline" className="rounded" disabled>
                        Connected
                    </Button>
                ) : (
                    <ConnectAccountDialog provider={provider} onConnect={onConnect} />
                )}
            </div>
        </div>
    );
}
