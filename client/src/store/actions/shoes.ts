import { TShoe } from './../../types/state'
export type TOverWriteShoes = {
  type: 'OVERWRITE_SHOES'
  newList: TShoe[]
}

export const overWriteShoesA = (newList: TShoe[]): TOverWriteShoes => {
  return {
    newList,
    type: 'OVERWRITE_SHOES'
  }
}

export type ShoeAction = TOverWriteShoes
