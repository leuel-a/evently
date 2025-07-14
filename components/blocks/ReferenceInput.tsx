import type {PropsWithChildren} from 'react';
import {makeApiCall} from '@/config/axios';
import {useQuery} from '@tanstack/react-query';
import type {QueryFunction} from '@tanstack/react-query';
import {ChoicesContext, ChoicesProvider} from '@/context/ChoicesContext';
import {checkIfRelativeLink} from '@/utils/functions';
import {HTTP_METHODS} from '@/config/routes';

export type TGetChoicesQueryKey = [string, {resource: string}];

export const getChoices: QueryFunction<Array<any>, [string, {resource: string}]> = async (context) => {
    const {queryKey} = context;
    const [_, {resource}] = queryKey;

    const url = checkIfRelativeLink(resource) ? resource : `/${resource}`;
    const response = await makeApiCall({url, method: HTTP_METHODS.GET});

    return response.data;
};

export default function ReferenceInput(props: ReferenceInputProps) {
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
