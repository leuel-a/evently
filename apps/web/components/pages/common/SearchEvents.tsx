'use client';

import {useState, useEffect, type ComponentProps} from 'react';
import {Search} from 'lucide-react';
import {useRouter, usePathname} from 'next/navigation';
import {Input} from '@/components/ui/input';
import {useDebounce} from '@/hooks/use-debounce';
import {cn} from '@/lib/utils';

interface SearchEventsProps {
    InputProps?: ComponentProps<typeof Input>;
}

export function SearchEvents({InputProps}: SearchEventsProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [input, setInput] = useState<string>('');
    const debouncedInput = useDebounce(input);

    const handleSearch = (value: string) => {
        const params = new URLSearchParams();
        params.append('q', value);
        router.replace(`${pathname}?${params.toString()}`);
    };

    useEffect(() => {
        handleSearch(debouncedInput);
    }, [debouncedInput]);

    return (
        <div className="w-full md:w-96 relative group">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                <Search className="h-4 w-4 text-gray-500 dark:text-zinc-500 group-focus-within:text-indigo-500 dark:group-focus-within:text-indigo-400 transition-colors duration-300" />
            </div>
            <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search events..."
                className={cn(
                    'w-full h-12 pl-10 rounded transition-all duration-300',
                    'focus:ring-2 focus:ring-indigo-500/20 group-hover:shadow-indigo-500/10 group-focus-within:shadow-indigo-500/20',
                    'bg-white dark:bg-zinc-800/50 border-gray-300 dark:border-zinc-700',
                    'text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-zinc-500',
                    'hover:border-gray-400 dark:hover:border-zinc-600 focus:bg-white dark:focus:bg-zinc-800 focus:border-indigo-500',
                    'backdrop-blur-sm',
                )}
                {...InputProps}
            />
            <div className="absolute inset-0 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/5 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 -z-10" />
        </div>
    );
}
