import env from './env'
import bcrypt from 'bcryptjs'

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(env.SALT_ROUNDS)
  return await bcrypt.hash(password, salt)
}

export const comparePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password,  hashedPassword)
}
