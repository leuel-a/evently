'use client';

import {useState, useEffect} from 'react';
import type {ComponentProps} from 'react';
import {useRouter} from 'next/navigation';
import {Input} from '@/components/ui/input';
import {APP_ROUTES} from '@/config/routes';
import {useDebounce} from '@/hooks/use-debounce';

interface SearchEventsProps {
    InputProps?: ComponentProps<typeof Input>;
}

export function SearchEvents(props: SearchEventsProps) {
    const router = useRouter();
    const [input, setInput] = useState<string>('');
    const debouncedInput = useDebounce(input);

    const handleSearch = (value: string) => {
        const params = new URLSearchParams();
        params.append('q', value);
        router.replace(`${APP_ROUTES.events.base}?${params.toString()}`);
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
