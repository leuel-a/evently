import {makeApiCall} from '@/config/api';
import {API_ROUTES} from '@/config/routes';

export async function GET() {
    const response = await makeApiCall({url: API_ROUTES.eventCategory.base});
    return Response.json(await response);
}

