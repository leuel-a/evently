import { createUserSchema } from '@/app/(unauthenticated)/auth/signup/validation'

export const dynamic = 'force-static'

export async function POST(request: Request) {
  const body = await request.json()

  return Response.json({ content: body })
}
