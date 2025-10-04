'use client';

import {useState} from 'react';
import {Search} from 'lucide-react';
import {Input} from '@/components/ui/input';

export function SearchEventsTable() {
    const [] = useState<string>('');
    return (
        <div className="flex items-center px-2 bg-white border border-input">
            <Search className="w-5 h-5 text-gray-500" />
            <Input
                className="border-none w-80"
                placeholder="Search for events..."
            />
        </div>
    );
}
