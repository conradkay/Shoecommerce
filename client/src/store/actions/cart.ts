export type TAddToCart = {
  shoeId: string
  size: number
  type: 'ADD_TO_CART'
}
export type TRemoveFromCart = {
  shoeId: string
  size: number
  type: 'REMOVE_FROM_CART'
}
export type TChangeSizeInCart = {
  shoeId: string
  type: 'CHANGE_SIZE_IN_CART'
  fromSize: number
  toSize: number
}

export const addToCartA = (shoeId: string, size: number): TAddToCart => {
  return {
    type: 'ADD_TO_CART',
    shoeId,
    size
  }
}

export const removeFromCartA = (
  shoeId: string,
  size: number
): TRemoveFromCart => {
  return {
    type: 'REMOVE_FROM_CART',
    shoeId,
    size
  }
}

export const changeSizeInCartA = (
  shoeId: string,
  fromSize: number,
  toSize: number
): TChangeSizeInCart => ({
  type: 'CHANGE_SIZE_IN_CART',
  shoeId,
  fromSize,
  toSize
})

export type CartAction = TAddToCart | TRemoveFromCart | TChangeSizeInCart
