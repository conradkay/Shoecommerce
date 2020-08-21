import { prop, getModelForClass } from '@typegoose/typegoose'
import { compare } from 'bcryptjs'
export class User {
  @prop({ required: true })
  public id!: string

  @prop({ required: true })
  public profileImg!: string

  @prop({ required: true })
  public username!: string

  @prop({ required: true })
  public email!: string

  @prop({ required: true })
  public password!: string
}

export const UserModel = getModelForClass(User)

export const comparePassword = async (
  candidatePassword: string,
  hash: string
) => {
  return await compare(candidatePassword, hash)
}
