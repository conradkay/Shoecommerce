import React from 'react'
import { TState } from '../../types/state'
import { CircularProgress, Grid } from '@material-ui/core'
import { connect } from 'react-redux'
import { ShoeCard } from './ShoeCard'

const mapState = (state: TState) => ({
  shoes: state.shoes
})

export const ShoeList = connect(
  mapState,
  null
)((props: ReturnType<typeof mapState>) => {
  return props.shoes.length ? (
    <Grid container spacing={4}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          minWidth: 300,
          width: '100%'
        }}
      >
        {props.shoes.map((shoe, index) => (
          <Grid item xs={12} md={6} key={index} style={{ margin: 30 }} lg={4}>
            <ShoeCard shoe={shoe} />
          </Grid>
        ))}
      </div>
    </Grid>
  ) : (
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
})
