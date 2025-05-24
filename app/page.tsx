import { prisma } from '@/lib/db'

export default async function Page() {
  const users = await prisma.user.findMany({})

  return (
    <main>
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.email}</li>
        ))}
      </ul>
    </main>
  )
}
