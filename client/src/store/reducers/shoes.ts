import { ReducerCases } from './../actions/types'
import { TState, TShoe } from '../../types/state'
import { createReducer } from './createReducer'
import { defaultState } from '../defaultState'
import { TOverWriteShoes } from '../actions/shoes'

const shoeCases: ReducerCases<TState['shoes']> = {
  OVERWRITE_SHOES: (shoes: TShoe[], action: TOverWriteShoes) => {
    return action.newList
  }
}

export const shoesReducer = createReducer<TState['shoes']>(
  defaultState.shoes,
  shoeCases
)
