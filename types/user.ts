import { BaseModel } from './base'

export interface IUserModel extends BaseModel {
  email: string
  username: string
  firstName?: string | null,
  lastName?: string | null
}
