import bcrypt from 'bcrypt'
import enviroment from '@/config/enviroment'

export async function hashPassword(password: string) {
  const saltRounds = await bcrypt.genSalt(enviroment.saltRounds)
  return bcrypt.hash(password, saltRounds)
}

export async function validatePassword(candidate: string, hash: string) {
  return bcrypt.compare(candidate, hash)
}
