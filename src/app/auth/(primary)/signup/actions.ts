'use server'

import prisma from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { hashPassword } from '@/utils/password'
import { type CreateUserType } from '@/app/auth/(primary)/signup/schema'

export async function createUser({ name, password, email }: CreateUserType) {
  const passHash = await hashPassword(password)

  await prisma.user.create({
    data: {
      name,
      password: passHash,
      email,
    },
  })

  revalidatePath('/')
}
