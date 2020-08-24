import { RTDispatch } from '../../types/types'
import { TUser } from '../../types/state'
import { openSnackbarA } from './snackbar'
import axios from 'axios'

export const registerA = (authData: {
  username: string
  password: string
  email: string
}) => {
  return async (dispatch: RTDispatch) => {
    const user = await axios.post('http://localhost:4000/register', {
      authData
    })
    if (user && user.data) {
      dispatch(openSnackbarA('Registered! Welcome To Mantella!', 'success'))

      dispatch({ type: 'REGISTER', user: user } as any)
    } else {
      dispatch(openSnackbarA('Could not Register', 'error'))
    }
  }
}

export const loginA = (authData: { email: string; password: string }) => {
  return async (dispatch: RTDispatch) => {
    const user = await axios.post('http://localhost:4000/login', { authData })
    if (user && user.data) {
      dispatch({ type: 'LOGIN', user: user } as any)
      dispatch(openSnackbarA('Logged in Successfully', 'success'))
    } else {
      dispatch(openSnackbarA('Could not Login', 'error'))
    }
  }
}

export const logoutA = () => {
  return async (dispatch: RTDispatch) => {
    const result = await axios.post('http://localhost:4000/logout')

    if (result && result.status === 200) {
      dispatch({ type: 'LOGOUT' })
      dispatch(openSnackbarA('Logged out', 'success'))
    } else {
      dispatch(openSnackbarA('Could not log out', 'error'))
    }
  }
}

export type TRegister = {
  type: 'REGISTER'
  user: TUser
}

export type TLogin = {
  type: 'LOGIN'
  user: TUser
}

export type TLogout = {
  type: 'LOGOUT'
}

export type UserAction = TRegister | TLogin | TLogout
