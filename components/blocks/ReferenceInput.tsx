import {useQuery} from '@tanstack/react-query';
import type {QueryFunction} from '@tanstack/react-query';
import type {PropsWithChildren} from 'react';
import {makeApiCall} from '@/config/axios';
import {HTTP_METHODS} from '@/config/routes';
import {ChoicesProvider} from '@/context/ChoicesContext';
import {checkIfRelativeLink as _} from '@/utils/functions';

export type TGetChoicesQueryKey = [string, {resource: string}];

// TODO: remove console.logs and use a proper browser logger

export const getChoices: QueryFunction<Array<any>, [string, {resource: string}]> = async (context) => {
    let choices = [];
    const {queryKey} = context;
    const [_, {resource}] = queryKey;

    const url = `/api/${resource}`;
    try {
        const response = await makeApiCall<Array<any>>({url, method: HTTP_METHODS.GET});
        choices = response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('Error response:', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers,
            });
        } else {
            console.error('Error setting up request:', error.message);
        }
    }
    return choices;
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
