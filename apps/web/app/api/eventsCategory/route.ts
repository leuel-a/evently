import {revalidatePath} from 'next/cache';
import {headers as nextHeaders} from 'next/headers';
import {makeApiCall} from '@/config/api';
import {API_ROUTES, APP_ROUTES} from '@/config/routes';
import {CreateEventsCategoryApiResponse} from '@/types/eventsCategory';

export async function GET() {
    const response = await makeApiCall({url: API_ROUTES.eventCategory.base});
    return Response.json(await response);
}

export async function POST(request: Request) {
    const headers = await nextHeaders();
    const requestBody = await request.json();

    const response = await makeApiCall<CreateEventsCategoryApiResponse>({
        url: API_ROUTES.eventCategory.base,
        body: JSON.stringify(requestBody),
        method: 'POST',
        headers,
    });

    revalidatePath(APP_ROUTES.dashboard.eventsCategory.base);
    return Response.json({...response});
}
