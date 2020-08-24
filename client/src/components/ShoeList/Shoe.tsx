import React from 'react'
import { Grid } from '@material-ui/core'
import { TState, TShoe } from '../../types/state'
import { useSelector } from 'react-redux'

// When they clicked the card they will be routed to /shoe/24 or /shoe/Jordan-24
export const Shoe = () => {
  const shoes: TShoe[] = useSelector((state: TState) => state.shoes)

  const id = window.location.hash.split('/')[2]

  const shoe = shoes.find((e) => {
    return e._id === id
  })

  if (shoe) {
    return (
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {/* in the future, display multiple images with a image selector */}
          <img
            alt={shoe.name}
            src={shoe.fullImgs[0]}
            style={{ backgroundSize: 'cover', width: '100%', height: '100%' }}
          />
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    )
  } else {
    return <div>hi</div> // <Redirect to="/404" />
  }
}
