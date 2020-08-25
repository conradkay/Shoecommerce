import {
  TChangeSizeInCart,
  TRemoveFromCart,
  TAddToCart
} from './../actions/cart'
import { ReducerCases } from '../actions/types'
import { defaultState } from '../defaultState'
import { createReducer } from './createReducer'
import { TState } from '../../types/state'

const ADD_TO_CART = (cart: TState['cart'], action: TAddToCart) => {
  return [
    ...cart,
    {
      shoeId: action.shoeId,
      size: action.size
    }
  ]
}
const REMOVE_FROM_CART = (cart: TState['cart'], action: TRemoveFromCart) => {
  return cart.filter((cartItem) => {
    if (cartItem.shoeId === action.shoeId && cartItem.size === action.size) {
      return false
    }
    return true
  })
}

const CHANGE_SIZE_IN_CART = (
  cart: TState['cart'],
  action: TChangeSizeInCart
) => {
  return cart.map((cartItem) => {
    if (
      cartItem.shoeId === action.shoeId &&
      cartItem.size === action.fromSize
    ) {
      return {
        ...cartItem,
        size: action.toSize
      }
    }
    return cartItem
  })
}
const userCases: ReducerCases<TState['cart']> = {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  CHANGE_SIZE_IN_CART
}

/** tags will be stored in a store, tasks can select tags */
export const cartReducer = createReducer<TState['cart']>(
  defaultState.cart,
  userCases
)
