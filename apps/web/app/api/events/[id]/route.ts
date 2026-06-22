import {makeApiCall} from '@/config/api';
import {API_ROUTES} from '@/config/routes';
import {UpdateEventApiResponse} from '@/types/events';
import {headers as nextHeaders} from 'next/headers';

export async function PUT(request: Request, {params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    const headers = await nextHeaders();
    const requestBody = await request.json();

    const response = await makeApiCall<UpdateEventApiResponse>({
        url: `${API_ROUTES.events.base}/${id}`,
        body: JSON.stringify(requestBody),
        method: 'PUT',
        headers,
    });

    return Response.json({...response});
}
