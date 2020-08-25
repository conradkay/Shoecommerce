import React, { useState } from 'react'
import {
  Grid,
  CircularProgress,
  TextField,
  MenuItem,
  Button
} from '@material-ui/core'
import { TState, TShoe } from '../../types/state'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { AddShoppingCart } from '@material-ui/icons'

// When they clicked the card they will be routed to /shoe/24 or /shoe/Jordan-24
export const Shoe = () => {
  let shoes: TShoe[] = useSelector((state: TState) => state.shoes)

  const id = window.location.hash.split('/')[2]

  let shoe = shoes.find((e) => {
    return e._id === id
  })

  const [selectedSize, setSelectedSize] = useState(
    shoe
      ? shoe.sizesAvailable.length > 1
        ? ((null as unknown) as Number)
        : shoe.sizesAvailable[0]
      : 0
  )

  if (shoe) {
    shoe = {
      ...shoe,
      sizesAvailable: shoe.sizesAvailable.slice().sort((a: any, b: any) => {
        return a[0] - b[0]
      })
    }

    return (
      <Grid container style={{ width: 'calc(100% - 32px)' }} spacing={4}>
        <Grid item xs={12} md={8}>
          {/* in the future, display multiple images with a image selector */}
          <img
            alt={shoe.name}
            src={shoe.fullImgs[0]}
            style={{ backgroundSize: 'cover', width: '100%', height: '100%' }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          style={{
            fontFamily: 'latoregular, Roboto',
            fontWeight: 400,
            marginTop: '10vh'
          }}
        >
          <div
            style={{
              fontSize: 22
            }}
          >
            <div style={{ textDecoration: 'underline' }}>
              {shoe.brand || ''}
            </div>
            <div style={{ color: '#8a8a8a', marginTop: 12 }}>{shoe.name}</div>
            <div style={{ color: '#8a8a8a' }}>"{shoe.color}"</div>
          </div>
          <TextField
            select
            label="Size"
            value={selectedSize ? selectedSize.toString() : ''}
            onChange={(e) => {
              setSelectedSize(parseInt(e.target.value, 10))
            }}
            style={{ marginTop: 36, width: '100%' }}
            helperText="US Size Measurements"
            variant="filled"
          >
            {shoe.sizesAvailable.map((size, i) => (
              <MenuItem
                key={i}
                value={size[0].toString()}
                style={{
                  fontFamily: 'latoregular, Roboto',
                  color: '#656565',
                  fontWeight: 500
                }}
              >
                Size {size[0]}{' '}
                <span style={{ marginLeft: 'auto' }}>${size[1]}.00</span>
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            style={{
              width: '100%',
              backgroundColor: 'black',
              borderRadius: 0,
              marginTop: 12,
              padding: '12px 0px'
            }}
          >
            <AddShoppingCart style={{ color: 'white' }} />{' '}
            <span style={{ color: 'white' }}>Add To Cart</span>
          </Button>
        </Grid>
      </Grid>
    )
  } else if (shoes.length) {
    return <Redirect to="/404" />
  } else {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-around'
        }}
      >
        <CircularProgress
          style={{
            width: '128px',
            height: '128px',
            marginRight: 64,
            marginTop: 100
          }}
        />
      </div>
    )
  }
}
