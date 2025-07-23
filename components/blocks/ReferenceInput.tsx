import {useQuery} from '@tanstack/react-query';
import type {QueryFunction} from '@tanstack/react-query';
import type {PropsWithChildren} from 'react';
import {makeApiCall} from '@/config/axios';
import {HTTP_METHODS} from '@/config/routes';
import {ChoicesProvider} from '@/context/ChoicesContext';
import {checkIfRelativeLink} from '@/utils/functions';

export type TGetChoicesQueryKey = [string, {resource: string}];

export const getChoices: QueryFunction<Array<any>, [string, {resource: string}]> = async (context) => {
    const {queryKey} = context;
    const [_, {resource}] = queryKey;

    // TODO: this might seem weird, but later will add check for only valid resources
    const url = checkIfRelativeLink(resource) ? `/api/${resource}` : `/api/${resource}`;

    try {
        const response = await makeApiCall({url, method: HTTP_METHODS.GET});
        return response.data;
    } catch (error: any) {
        if (error.response) {
            console.error('Error response:', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers,
            });
        } else {
            // TODO: use a proper logger instead of the browser logging module
            console.error('Error setting up request:', error.message);
        }
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
