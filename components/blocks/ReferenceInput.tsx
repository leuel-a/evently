import {useQuery} from '@tanstack/react-query';
import type {QueryFunction} from '@tanstack/react-query';
import type {PropsWithChildren} from 'react';
import {makeApiCall} from '@/config/axios';
import {HTTP_METHODS} from '@/config/routes';
import {ChoicesProvider} from '@/context/ChoicesContext';
import {checkIfRelativeLink as _} from '@/utils/functions';

export type TGetChoicesQueryKey = [string, {resource: string}];

export const getChoices: QueryFunction<Array<any>, [string, {resource: string}]> = async (
    context,
) => {
    try {
        const {queryKey} = context;
        const [_, {resource}] = queryKey;
        const url = `${resource}`;
        return (await makeApiCall<Array<any>>({url, method: HTTP_METHODS.GET})).data;
    } catch (error: any) {
        if (error.response) {
            console.log('Error response:', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers,
            });
        } else {
            console.log('Error setting up request:', error.message);
        }
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
