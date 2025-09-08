'use client';

import {useState} from 'react';
import {ChevronDown, ChevronUp} from 'lucide-react';
import {SelectEventCategory} from '@/components/pages/(site)';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {useIsMobile} from '@/hooks/use-mobile';
import {cn} from '@/lib/utils';

export function FiltersEvent() {
    const isMobile = useIsMobile();
    const [showFilter, setShowFilter] = useState<boolean>();

    return (
        <div className="flex flex-col gap-1 md:gap-0 md:flex-row justify-between">
            <div className="w-full md:w-fit">
                <Input placeholder="Search for your events" className="w-full md:w-96 h-12" />
            </div>
            <div className="relative md:hidden my-8 mt-4">
                <Button variant="secondary" onClick={() => setShowFilter((prev) => !prev)} className="absolute right-0">
                    {showFilter ? <ChevronUp /> : <ChevronDown />}
                </Button>
            </div>
            <div className={cn(isMobile && showFilter ? 'block' : 'hidden md:block')}>
                <SelectEventCategory />
            </div>
        </div>
    );
}
