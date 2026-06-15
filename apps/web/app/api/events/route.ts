import {revalidatePath} from 'next/cache';
import {headers as nextHeaders} from 'next/headers';
import {makeApiCall} from '@/config/api';
import {API_ROUTES, APP_ROUTES} from '@/config/routes';
import {CreateEventApiResponse} from '@/types/events';

export async function GET() {
    const response = await makeApiCall({url: API_ROUTES.events.base});
    return Response.json(response);
}

export async function POST(request: Request) {
    const headers = await nextHeaders();
    const requestBody = await request.json();

    const response = await makeApiCall<CreateEventApiResponse>({
        url: API_ROUTES.events.base,
        body: JSON.stringify(requestBody),
        method: 'POST',
        headers,
    });

    revalidatePath(APP_ROUTES.dashboard.events.base);
    return Response.json({...response});
}
