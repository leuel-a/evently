'use client';

import {useState, useEffect} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {Input} from '@/components/ui/input';
import {APP_ROUTES} from '@/config/routes';
import {useResourceContext} from '@/context/ResourceContext';
import {useDebounce} from '@/hooks/use-debounce';
import {getLabelForResource} from '@/utils';

export function SearchResourceInput() {
    const router = useRouter();
    const resource = useResourceContext();
    const searchParams = useSearchParams();

    const [input, setInput] = useState<string>('');
    const debouncedInput = useDebounce(input);
    const searchPlaceHolder = `Search ${getLabelForResource(resource)}`;

    const handleSearch = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('q', value);
        router.replace(`${APP_ROUTES.dashboard.events.base}?${params.toString()}`);
    };

    useEffect(() => {
        handleSearch(debouncedInput);
    }, [debouncedInput]);

    return (
        <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={searchPlaceHolder}
            className="text-lg bg-white w-80"
        />
    );
}
