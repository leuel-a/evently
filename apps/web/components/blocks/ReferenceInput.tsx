import {useQuery} from '@tanstack/react-query';
import type {QueryFunction} from '@tanstack/react-query';
import type {PropsWithChildren} from 'react';
import {ChoicesProvider} from '@/context/ChoicesContext';
import {checkIfRelativeLink as _} from '@/utils/functions';
import {IApiResponse} from '@/types';

export type TGetChoicesQueryKey = [string, {resource: string}];

export const getChoices: QueryFunction<Array<any>, [string, {resource: string}]> = async (
    context,
) => {
    try {
        const [, {resource}] = context.queryKey;
        const response = await fetch(resource);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const result = (await response.json()) as IApiResponse;
        return result?.data;
    } catch (error) {
        console.error('getChoices error:', error);
        return [];
    }
};

export function ReferenceInput(props: ReferenceInputProps) {
    const {resource, children} = props;
    const {data} = useQuery({
        queryKey: ['choices', {resource}],
        queryFn: getChoices,
    });
    return <ChoicesProvider choices={data}>{children}</ChoicesProvider>;
}

export interface ReferenceInputProps extends PropsWithChildren {
    resource: string;
}
