import {makeApiCall} from '@/config/api';
import {API_ROUTES} from '@/config/routes';

export async function GET(req: Request) {
    const response = await makeApiCall({
        url: API_ROUTES.users.linkedAccounts,
        headers: req.headers,
    });

    return Response.json(response);
}
