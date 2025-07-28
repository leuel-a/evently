import prisma from '@/lib/db/prisma';

export async function GET(request: Request) {
    const eventCategories = await prisma.eventsCategory.findMany();
    return Response.json(eventCategories);
}
