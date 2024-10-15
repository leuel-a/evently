import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)

  const search = url.searchParams.get('search')
  const category = url.searchParams.get('category')

  const events = await prisma.event.findMany({
    where: {
      ...(category && { category: category }),
      ...(search && { title: { search }, description: { search } }),
    },
  })
  return NextResponse.json(events)
}
