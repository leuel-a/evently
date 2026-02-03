const API_BASE_URL = process.env.API_BASE_URL;

export async function GET() {
    const response = await fetch(`${API_BASE_URL}/events`);
    return Response.json(await response.json());
}
