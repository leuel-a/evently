import {useQuery} from '@tanstack/react-query';
import type {QueryFunction} from '@tanstack/react-query';
import type {PropsWithChildren} from 'react';
import {ChoicesProvider} from '@/context/ChoicesContext';
import {checkIfRelativeLink as _} from '@/utils/functions';
import {IApiResponse} from '@/types/utils';
import {makeApiCall} from '@/config/api';

interface ReferenceInputProps extends PropsWithChildren {
    resource: string;
    internal?: boolean;
}

export function ReferenceInput(props: ReferenceInputProps) {
    const {resource, children, internal = false} = props;
    // TODO: work one this query key
    const {data} = useQuery({
        queryKey: ['choices', {resource}],
        queryFn: getChoices(internal),
    });

    return <ChoicesProvider choices={data?.data ?? []}>{children}</ChoicesProvider>;
}

export type TGetChoicesQueryKey = [string, {resource: string}];

export const getChoices =
    (internal: boolean): QueryFunction<IApiResponse<Array<any>>, TGetChoicesQueryKey> =>
    async (context) => {
        const [, {resource: url}] = context.queryKey;
        return makeApiCall<IApiResponse<Array<any>>>({url, internal});
    };
