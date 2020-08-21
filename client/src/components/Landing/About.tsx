import React from 'react'
import { createStyles, withStyles } from '@material-ui/core/styles'
import { Button, Typography, WithStyles } from '@material-ui/core'
import { Helmet } from 'react-helmet'

const styles = () =>
  createStyles({
    heroContent: {
      margin: '0 auto',
      backgroundImage:
        'url("http://tadalafilforsale.net/data/media/40/56168863.jpg")',
      height: '48vh',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      position: 'relative',
      marginBottom: 20
    },
    heroTitle: {
      fontSize: 64,
      color: 'white',
      textAlign: 'center',
      margin: 'auto 0px',
      position: 'absolute'
    },
    kayLink: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 16,
      marginBottom: 16,
      textAlign: 'center',
      minHeight: 368
    }
  })

type TProps = WithStyles<typeof styles>

export const About = withStyles(styles)((props: TProps) => {
  const { classes } = props

  return (
    <div>
      <Helmet>
        <style type="text/css">{` body { background-color: #1d364c; } h4 { color: white !important; }`}</style>
        <script
          type="text/javascript"
          src={'https://platform.linkedin.com/badges/js/profile.js'}
          async
          defer
        />
        <meta
          name="description"
          content="Philibo is a platform to exchange stocks in real time without using real money"
        />
      </Helmet>
      <div className={classes.heroContent}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography variant="h2" className={classes.heroTitle}>
            Philibo — It's Free
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => (location.hash = '#/register')}
            style={{ marginTop: 'auto', marginBottom: 32 }}
          >
            Sign up today
          </Button>
        </div>
      </div>
      <div style={{ margin: '20px 0' }}>
        <Typography variant="h4" align="center" gutterBottom>
          The Team
        </Typography>
        <div className={classes.kayLink}>
          <div
            className="LI-profile-badge"
            data-version="v1"
            data-size="large"
            data-locale="en_US"
            data-type="vertical"
            data-theme="dark"
            data-vanity="conrad-kay-4a823b139"
          >
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="LI-simple-link"
              href="https://www.linkedin.com/in/conrad-kay-4a823b139?trk=profile-badge"
            >
              Conrad Kay - I am the Techlead
            </a>
          </div>
        </div>
      </div>
    </div>
  )
})
