import { makeApiCall } from "@/config/api";
import {API_ROUTES} from '@/config/routes';

export async function GET() {
    const response = await makeApiCall({url: API_ROUTES.dashboard.settings.base});
    return Response.json(response);
}
