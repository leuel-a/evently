import { type NextRequest } from 'next/server';

import prisma from '@/lib/db';

export const dynamic = 'force-static';

export async function GET() {
  return await prisma.event.findMany({});
}

export async function POST(request: NextRequest) {}
