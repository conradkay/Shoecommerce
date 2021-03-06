import { getModelForClass, prop } from '@typegoose/typegoose'

export class Shoe {
  @prop({ required: true })
  public _id!: string

  @prop({ required: true })
  public name!: string
  @prop({ required: true })
  public cardImg!: string
  @prop({ required: true })
  public sizesAvailable!: [Number]
  @prop({ required: true })
  public fullImgs!: [string]
  @prop({ required: true })
  public details!: string
  @prop({ required: true })
  public price!: Number
  @prop({ required: true })
  public release!: string
  @prop({ required: true })
  public brand!: string
}

export const ShoeModel = getModelForClass(Shoe)
