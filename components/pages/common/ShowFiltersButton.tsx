import type {Dispatch, SetStateAction} from 'react';
import {ChevronDown, ChevronUp} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Tooltip, TooltipTrigger, TooltipContent} from '@/components/ui/tooltip';

export interface ShowFiltersButttonProps {
    showFilter: boolean;
    setShowFilter: Dispatch<SetStateAction<boolean>>;
}

export function ShowFiltersButton({setShowFilter, showFilter}: ShowFiltersButttonProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="secondary"
                    onClick={() => setShowFilter((prev) => !prev)}
                    className="absolute rounded-full right-0 bg-indigo-500 text-white aspect-square hover:bg-indigo-500"
                >
                    {showFilter ? <ChevronUp /> : <ChevronDown />}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Show Filters</p>
            </TooltipContent>
        </Tooltip>
    );
}
