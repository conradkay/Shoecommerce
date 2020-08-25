import { TSnackbar } from '../types/state'

import { TState } from '../types/state'

export const defaultSnackbar: TSnackbar = {
  open: false,
  message: 'Who are you and why are you looking at my redux state',
  variant: 'success'
}

export const defaultState: TState = {
  user: null,
  snackbar: defaultSnackbar,
  shoes: [],
  cart: []
}
