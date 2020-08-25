export type TUser = {
  _id: string
  username: string
  email: string
}

export type TShoe = {
  _id: string
  name: string
  sizesAvailable: Array<[number, number]>
  cardImg: string
  fullImgs: string[]
  details: string
  release: string // in a string bc why not
  brand: string // Nike / Adidas / etc
  color: string // colour moment
}

export type TVariant = 'success' | 'warning' | 'error' | 'standard'

export type TSnackbar = {
  open: boolean
  message: string
  variant: TVariant
}

export type CartItem = {
  shoeId: string
  size: number
}

export type TState = {
  cart: CartItem[]
  snackbar: TSnackbar
  user: TUser | null
  shoes: TShoe[]
}
