const API_BASE_URL = process.env.API_BASE_URL;

export async function GET() {
    const response = await fetch(`${API_BASE_URL}/settings`);
    return Response.json(await response.json());
}
