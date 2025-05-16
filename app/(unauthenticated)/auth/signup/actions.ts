'use server'

import { prisma } from '@/lib/db'
import { createUserSchema } from './validation'

// TODO: read about what the import('next/cache').revalidatePath does from next
export async function createUser(formData: FormData) {
  try {
    const fields = {
      username: String(formData.get('username')),
      email: String(formData.get('email')),
      password: String(formData.get('password')),
      confirmPassword: String(formData.get('password')),
    }

    const validatedFields = await createUserSchema.parseAsync(fields)
    const user = await prisma.user.create({ data: validatedFields })
  } catch (error) {
    return { errors: [{ message: 'An unexpected error has occured can not create a user' }] }
  }
}
