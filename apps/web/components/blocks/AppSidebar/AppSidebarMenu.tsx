'use client';

import NextLink from 'next/link';
import {ElementType} from 'react';
import {usePathname} from 'next/navigation';
import {SidebarMenuButton, SidebarMenuItem} from '@/components/ui/sidebar';
import {cn} from '@/lib/utils';

interface AppSidebarMenuProps {
    resource: {
        title: string;
        url: string;
        icon: ElementType;
        group: string;
    };
}

export function AppSidebarMenu({resource}: AppSidebarMenuProps) {
    const pathname = usePathname();
    const {icon: Icon, title, url} = resource;

    const isActive = pathname === url;

    return (
        <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive} tooltip={title}>
                <NextLink
                    href={url}
                    className={cn(
                        'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all',
                        'hover:bg-accent hover:text-accent-foreground',
                        'data-[active=true]:bg-accent data-[active=true]:text-accent-foreground',
                    )}
                >
                    <Icon
                        className={cn(
                            'h-4 w-4 shrink-0 transition-transform duration-200',
                            'text-muted-foreground group-hover:text-foreground',
                            isActive && 'text-foreground',
                        )}
                    />
                    <span className="truncate">{title}</span>
                </NextLink>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}
