import prisma from '@/lib/db'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const url = new URL(request.url)

  const page = url.searchParams.get('page')
  const limit = url.searchParams.get('limit')
  const search = url.searchParams.get('search')
  const category = url.searchParams.get('category')

  // get pagination values
  const take = limit && typeof Number(limit) === 'number' ? Number(limit) : 6
  const skip = page && typeof Number(page) === 'number' ? (Number(page) - 1) * take : 0

  const events = await prisma.event.findMany({
    where: {
      ...(category && { category: category }),
      ...(search && { title: { search }, description: { search } }),
    },
    take,
    skip,
  })
  const count = await prisma.event.count()
  
  return NextResponse.json({ events, count })
}
