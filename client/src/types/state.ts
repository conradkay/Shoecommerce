export type TUser = {
  _id: string
  username: string
  email: string
}

export type TShoe = {
  _id: string
  name: string
  sizesAvailable: number[]
  cardImg: string
  fullImgs: string[]
  details: string
  price: number
  release: string // in a string bc why not
  brand: string // Nike / Adidas / etc
}

export type TVariant = 'success' | 'warning' | 'error' | 'standard'

export type TSnackbar = {
  open: boolean
  message: string
  variant: TVariant
}

export type TState = {
  snackbar: TSnackbar
  user: TUser | null
  shoes: TShoe[]
}
