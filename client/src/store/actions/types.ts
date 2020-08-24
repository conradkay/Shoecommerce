import { UserAction } from './auth'
import { SnackbarAction } from './snackbar'
import { ShoeAction } from './shoes'

export type TAction = Readonly<SnackbarAction | UserAction | ShoeAction>

export type ActionTypes = TAction['type']

export type ReducerCases<State> = {
  [actionCase in ActionTypes]?: (state: State, action: TAction) => void
}
