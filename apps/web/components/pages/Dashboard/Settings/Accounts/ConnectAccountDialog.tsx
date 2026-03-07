'use client';

import {useState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import type {ProviderConfig, ProviderKey} from './types';
import {cn} from '@/lib/utils';

export interface ConnectAccountDialogProps {
    provider: ProviderConfig;
    onConnect?: (provider: ProviderKey) => Promise<void> | void;
}

export function ConnectAccountDialog({provider, onConnect}: ConnectAccountDialogProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const Icon = provider.icon;

    async function handleConnect() {
        try {
            setIsLoading(true);
            await onConnect?.(provider.id);
            setOpen(false);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-indigo-700 rounded">Connect</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                    </div>
                    <DialogTitle>Connect {provider.label}</DialogTitle>
                    <DialogDescription>
                        You are about to connect your {provider.label} account to your profile.
                        After authentication, this provider will appear in your linked accounts.
                    </DialogDescription>
                </DialogHeader>

                <div
                    className={cn(
                        'rounded-xl border bg-muted/40 p-4 text-sm text-muted-foreground',
                    )}
                >
                    This will start the authentication flow for{' '}
                    <span className="font-medium text-foreground">{provider.label}</span>.
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => setOpen(false)} disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={handleConnect} disabled={isLoading}>
                        {isLoading ? 'Connecting...' : `Continue with ${provider.label}`}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
