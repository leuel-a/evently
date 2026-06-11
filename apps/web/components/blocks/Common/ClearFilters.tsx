'use client';

import {useSearchParams, useRouter, usePathname} from 'next/navigation';
import {X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Tooltip, TooltipTrigger, TooltipContent} from '@/components/ui/tooltip';
import {revalidateEvents} from '@/app/dashboard/events/actions';

const TOOL_TIP_CONTENT = 'Clear Filters';

export function ClearFilters() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const filters = searchParams.get('filters');

    const handleClearFilters = () => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('filters', '');
        router.push(`${pathname}?${newParams.toString()}`);
        revalidateEvents();
    };

    if (filters === '') {
        return <></>;
    }

    return (
        <div className="flex justify-end w-full">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        type="button"
                        className="rounded-full border border-gray-500 cursor-pointer"
                        variant="ghost"
                        onClick={handleClearFilters}
                    >
                        <X className="text-gray-500" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side='left' className="bg-indigo-500 text-white">
                    {TOOL_TIP_CONTENT}
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
