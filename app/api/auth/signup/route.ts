export const dynamic = 'force-static'

export async function GET() {
  return Response.json({ message: 'Hello, World!' })
}

export async function POST() {}
