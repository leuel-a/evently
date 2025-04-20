import { hash, genSalt } from 'bcrypt'

export async function hashPassword(password: string) {
  try {
    const salt = await genSalt(10)
    const hashedPassword = await hash(password, salt)

    return hashedPassword
  } catch (error) {
    // TODO: use a logger instead of console.log
    console.error('something went wrong while trying to hash the password')
    return null
  }
}
