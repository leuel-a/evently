'use client';

import {useState, useEffect, type ComponentProps} from 'react';
import {useRouter, usePathname} from 'next/navigation';
import {Input} from '@/components/ui/input';
import {useDebounce} from '@/hooks/use-debounce';

interface SearchEventsProps {
    InputProps?: ComponentProps<typeof Input>;
}

export function SearchEvents(props: SearchEventsProps) {
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
        <div className="w-full bg-white md:w-fit">
            <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search for your events"
                className="w-full md:w-96 h-12"
                {...props.InputProps}
            />
        </div>
    );
}
