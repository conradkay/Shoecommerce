import React, { useState } from 'react'
import { connect } from 'react-redux'
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
  withStyles,
  WithStyles
} from '@material-ui/core'
import { LockOpen } from '@material-ui/icons'
import { formStyles } from '../styles/formStyles'
import { openSnackbarA } from '../../store/actions/snackbar'
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet'
import { loginA, registerA } from '../../store/actions/auth'

type OwnProps = {
  authType: 'Register' | 'Login'
}
type TProps = WithStyles<typeof formStyles> & typeof actionCreators & OwnProps

const Auth = ({ authType, openSnackbar, classes, register, login }: TProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmText, setConfirmText] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const onSubmit = () => {
    setLoading(true)
    if (authType === 'Register') {
      registerA({ username, email, password })
    } else {
      loginA({ email, password })
    }
    window.location.hash = '#/dashboard'
  }

  return (
    <div style={{ margin: 20 }}>
      <Helmet>
        <style type="text/css">{` body { background-color: #1d364c; }`}</style>
        <meta
          content="Get started with Wudabon today, totally free!"
          name={'description'}
        />
      </Helmet>
      <main className={classes.layout}>
        <form
          autoComplete="on"
          onSubmit={e => {
            e.preventDefault()
            onSubmit()
          }}
        >
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOpen />
            </Avatar>
            <Typography style={{ fontSize: 17 }}>{authType}</Typography>
            {authType === 'Register' && (
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                style={{ marginTop: 10 }}
              >
                Login Instead
              </Button>
            )}
            {/* Full Name */}
            {authType === 'Register' && (
              <TextField
                margin="dense"
                fullWidth
                required
                autoComplete="off"
                onChange={e => setUsername(e.target.value)}
                value={username}
                label="Full Name"
              />
            )}
            <TextField
              margin="dense"
              fullWidth
              name="email"
              required
              autoComplete="on"
              value={email}
              onChange={e => {
                setEmail(e.target.value)
              }}
              label="Email"
              type="email"
            />
            {/* password */}
            <TextField
              margin="dense"
              fullWidth
              required
              autoComplete="on"
              label="Password"
              name="password"
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {/* confirm password */}
            {authType === 'Register' && (
              <TextField
                type="password"
                margin="dense"
                fullWidth
                required
                autoComplete="off"
                label="Confirm Password"
                error={confirmText !== password}
                value={confirmText}
                onChange={e => setConfirmText(e.target.value)}
              />
            )}
            {/* submit button */}
            <Grid container justify="center" style={{ marginTop: '10px' }}>
              {loading && <CircularProgress style={{ margin: '4px auto' }} />}

              <Button
                variant="contained"
                color="secondary"
                fullWidth
                disabled={
                  authType === 'Register'
                    ? password.trim() === '' || password !== confirmText
                    : false
                }
                type="submit"
                style={{
                  marginTop: 10
                }}
              >
                {authType}
              </Button>
            </Grid>
            <Grid
              container
              style={{ marginTop: 15 }}
              alignContent="space-between"
            >
              <IconButton>
                <img
                  alt={'google'}
                  src="https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png"
                  style={{ height: 50, width: 50 }}
                />
              </IconButton>
              <IconButton style={{ marginLeft: 8 }}>
                <img
                  alt={'facebook'}
                  src="https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/facebook_circle-512.png"
                  style={{ height: 50, width: 50 }}
                />
              </IconButton>
              <IconButton style={{ marginLeft: 8 }}>
                <img
                  alt={'github'}
                  src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-social-github-512.png"
                  style={{ height: 50, width: 50 }}
                />
              </IconButton>
              <IconButton style={{ marginLeft: 8 }}>
                <img
                  alt={'twitter'}
                  src="https://cdn3.iconfinder.com/data/icons/social-icons-5/607/Twitterbird.png"
                  style={{ height: 50, width: 50 }}
                />
              </IconButton>
            </Grid>
          </Paper>
        </form>
      </main>
    </div>
  )
}

const actionCreators = {
  openSnackbar: openSnackbarA,
  register: registerA,
  login: loginA
}

export const AuthRender = withStyles(formStyles)(
  connect(
    null,
    actionCreators
  )(Auth as any)
)
