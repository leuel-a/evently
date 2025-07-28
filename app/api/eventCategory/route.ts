import {prisma} from '@/lib/db';

export async function GET(request: Request) {
    const eventCategories = await prisma.eventsCategory.findMany();
    return Response.json(eventCategories);
}
