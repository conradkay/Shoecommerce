import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TState } from '../../types/state'
import { Redirect } from 'react-router'
import { openSnackbarA } from '../../store/actions/snackbar'
export const Cart = () => {
  const cart = useSelector((state: TState) => state.cart)
  const dispatch = useDispatch()

  if (cart.length) {
    return <div>yep</div>
  } else {
    dispatch(openSnackbarA('No Items in Cart', 'warning'))
    return <Redirect to="/" />
  }
}
