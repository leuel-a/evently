import {prisma} from '@/lib/prisma';

export async function GET(request: Request) {
    const eventCategories = await prisma.eventsCategory.findMany();
    return Response.json(eventCategories);
}
