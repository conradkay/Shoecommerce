import React, { CSSProperties, useState } from 'react'
import { render } from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Switch, Route, HashRouter } from 'react-router-dom'

import { store } from './store/store'
import { createMuiTheme } from '@material-ui/core/styles'
import { AuthRender } from './components/Auth/Auth'
import { NoMatch } from './components/NoMatch/NoMatch'
import { CircularProgress } from '@material-ui/core'
import { ShoeList } from './components/ShoeList/ShoeList'

import { Header } from './components/Header'
import { SnackbarRoot } from './components/utils/SnackbarRoot'
import { loginA } from './store/actions/auth'
import { PublicOnlyRoute, PrivateRoute } from './components/utils/Routing'
import { Settings } from './components/Settings/Settings'
import { Shoe } from './components/ShoeList/Shoe'
import axios from 'axios'
import { overWriteShoesA } from './store/actions/shoes'

const secondary = '#0336FF'
const primary = '#00838f'
// const primary = '#f4511e'
// const secondary = '#3f51b5'

/** @description Material ui theme, used in wrapper.tsx */

const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary
    },
    secondary: {
      main: secondary
    }
  }
})

export const fabStyle: CSSProperties = {
  position: 'fixed',
  bottom: theme.spacing(2),
  left: theme.spacing(2),
  zIndex: 999
}

const Router = () => {
  const [loaded, setLoaded] = useState(false)

  window.onload = async () => {
    try {
      const data = await axios.post('http://localhost:4000/user/login')
      if (data && data.data && data.data.user) {
        store.dispatch(loginA(data.data.user) as any)
      }
      setLoaded(true)
    } catch (err) {
      setLoaded(true)
    }
    try {
      const shoeData = await axios.get('http://localhost:4000/shoes')

      if (shoeData && shoeData.data && shoeData.data.shoes.length) {
        store.dispatch(overWriteShoesA(shoeData.data.shoes))
        setLoaded(true)
      }
      setLoaded(true)
    } catch (err) {
      setLoaded(true)
    }
  }

  return (
    <HashRouter>
      <>
        <Header />

        {loaded ? (
          <Switch>
            <PrivateRoute
              exact
              path="/settings"
              component={Settings}
              componentProps={{}}
            />
            <PublicOnlyRoute
              exact
              path="/login"
              component={AuthRender}
              componentProps={{ authType: 'Login' }}
            />
            <PublicOnlyRoute
              exact
              path="/register"
              component={AuthRender}
              componentProps={{ authType: 'Register' }}
            />

            <PublicOnlyRoute
              exact
              path="/"
              component={ShoeList}
              componentProps={() => ({})}
            />
            <Route path="/shoe/:shoeId">
              <Shoe />
            </Route>
            <Route component={NoMatch} />
          </Switch>
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
        )}
      </>
    </HashRouter>
  )
}

export const Wrapper = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <SnackbarRoot />
        <Router />
      </MuiThemeProvider>
    </Provider>
  )
}

render(<Wrapper />, document.getElementById('root'))
