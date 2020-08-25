import { UserAction } from './auth'
import { SnackbarAction } from './snackbar'
import { ShoeAction } from './shoes'
import { CartAction } from './cart'

export type TAction = Readonly<
  SnackbarAction | UserAction | ShoeAction | CartAction
>

export type ActionTypes = TAction['type']

export type ReducerCases<State> = {
  [actionCase in ActionTypes]?: (state: State, action: TAction) => void
}
