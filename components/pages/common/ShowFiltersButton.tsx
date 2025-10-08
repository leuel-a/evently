import type {Dispatch, SetStateAction} from 'react';
import {ChevronDown, Filter} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Tooltip, TooltipTrigger, TooltipContent} from '@/components/ui/tooltip';
import {cn} from '@/lib/utils';

export interface ShowFiltersButtonProps {
    showFilter: boolean;
    setShowFilter: Dispatch<SetStateAction<boolean>>;
}

export function ShowFiltersButton({setShowFilter, showFilter}: ShowFiltersButtonProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="secondary"
                    onClick={() => setShowFilter((prev) => !prev)}
                    className="flex items-center h-12 gap-2 px-4 py-3 bg-white dark:bg-zinc-800/50 backdrop-blur-sm border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-200 rounded hover:bg-gray-50 dark:hover:bg-zinc-700/50 hover:border-indigo-500 hover:text-gray-900 dark:hover:text-white transition-all duration-300 group min-w-[100px]"
                >
                    <Filter className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-sm font-medium">{showFilter ? 'Hide' : 'Filters'}</span>
                    <ChevronDown
                        className={cn(
                            'h-4 w-4 transition-transform duration-300',
                            showFilter ? 'rotate-180' : 'rotate-0',
                        )}
                    />
                </Button>
            </TooltipTrigger>
            <TooltipContent className="bg-white dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 text-gray-900 dark:text-white">
                <p>{showFilter ? 'Hide filters' : 'Show filters'}</p>
            </TooltipContent>
        </Tooltip>
    );
}
