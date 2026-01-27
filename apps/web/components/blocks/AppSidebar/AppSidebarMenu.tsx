import NextLink from 'next/link';
import {ElementType} from 'react';
import {SidebarMenuItem, SidebarMenuButton} from '@/components/ui/sidebar';

interface AppSidebarMenuProps {
    resource: {title: string; url: string; icon: ElementType; group: string};
}

export function AppSidebarMenu({resource}: AppSidebarMenuProps) {
    const {icon: Icon} = resource;

    return (

        <SidebarMenuItem key={resource.url}>
            <SidebarMenuButton>
                <NextLink 
                    href={resource.url} 
                    className="flex items-center space-x-3 p-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-150"

                >
                    <Icon className="w-5 h-5" />
                    <span>{resource.title}</span>
                </NextLink>
            </SidebarMenuButton>
        </SidebarMenuItem>

    );

}
