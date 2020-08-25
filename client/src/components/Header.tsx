import React, { useState } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import MenuIcon from '@material-ui/icons/Menu'
import {
  Theme,
  WithStyles,
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Drawer,
  Tab,
  Avatar,
  Tooltip,
  Badge
} from '@material-ui/core'
import { Trail } from 'react-spring/renderprops'
import {
  HowToReg,
  PieChart,
  Help,
  Settings,
  Restaurant,
  ShoppingCart
} from '@material-ui/icons'
import { Link as NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { TState } from '../types/state'

/**
 * @todo Refresh changing tab is kinda slow
 * @todo make it have a Drawer for the Header with all the different links on mobile (have a button as well as being swipable)
 */

const noAuthItems = [
  {
    label: 'Shoes',
    pathname: '/',
    menuIcon: Help
  },
  {
    label: 'Contact',
    pathname: '/contact',
    menuIcon: Help
  },
  {
    label: 'Login',
    pathname: '/login',
    menuIcon: HowToReg
  },
  {
    label: 'Register',
    pathname: '/register',
    menuIcon: HowToReg
  },
  {
    label: 'Cart',
    pathname: '/cart',
    menuIcon: ShoppingCart
  }
]

const authItems = [
  {
    label: 'Cart',
    pathname: '/cart',
    menuIcon: ShoppingCart
  },
  {
    label: 'Shoes',
    pathname: '/',
    menuIcon: Help
  },
  { label: 'Settings', pathname: '/settings', menuIcon: Settings },
  {
    label: 'Dashboard',
    pathname: '/dashboard',
    menuIcon: PieChart
  },
  { label: 'Recipes', pathname: '/recipes', menuIcon: Restaurant }
]

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
      boxShadow: 'none',
      borderBottom: `1px solid ${theme.palette.grey['100']}`,
      backgroundColor: 'white'
    },
    inline: {
      display: 'inline'
    },
    flex: {
      display: 'flex'
    },
    link: {
      textDecoration: 'none',
      color: 'inherit'
    },
    tagline: {
      display: 'inline-block',
      marginLeft: 10
    },
    iconContainer: {
      display: 'none',
      [theme.breakpoints.down('md')]: {
        display: 'block',
        marginLeft: 'auto'
      }
    },
    tabContainer: {
      marginLeft: 'auto',
      [theme.breakpoints.down('md')]: {
        display: 'none'
      }
    },
    tabItem: {
      paddingTop: 20,
      paddingBottom: 20,
      minWidth: 'auto'
    },
    iconButton: {}
  })

type TProps = WithStyles<typeof styles> &
  RouteComponentProps &
  ReturnType<typeof mapState>

const Topbar = (props: TProps) => {
  const [drawer, setDrawer] = useState(false)

  const { classes } = props

  const MenuItems = props.authenticated !== null ? authItems : noAuthItems

  const value = MenuItems.map((menuItem) => menuItem.pathname).indexOf(
    props.location.pathname
  )

  return (
    <>
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar style={{ minHeight: 64, padding: '0px 24px' }}>
          <Grid container spacing={3} alignItems="center">
            <Grid
              item
              xs={12}
              style={{ alignItems: 'center' }}
              className={classes.flex}
            >
              {props.authenticated !== null && <></>}
              <div className={classes.inline}>
                <Typography variant="h6" color="inherit" noWrap>
                  <Trail
                    items={'Kanban Brawn'}
                    from={{ transform: 'translate3d(0,-40px,0)' }}
                    to={{ transform: 'translate3d(0,0px,0)' }}
                  >
                    {(item) => (trailProps) => (
                      <Tooltip title="Data provided by IEX Cloud (https://iexcloud.io)">
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://github.com/conradkay/Shoecommerce"
                          style={{
                            ...trailProps,
                            color: 'black',
                            textDecoration: 'none',
                            paddingRight: 5
                          }}
                          className={classes.tagline}
                        >
                          Shoecommerce
                        </a>
                      </Tooltip>
                    )}
                  </Trail>
                </Typography>
              </div>
              <React.Fragment>
                <div className={classes.iconContainer}>
                  <IconButton
                    onClick={() => setDrawer(true)}
                    className={classes.iconButton}
                  >
                    <MenuIcon />
                  </IconButton>
                </div>

                <div className={classes.tabContainer}>
                  <Tabs
                    value={value === -1 ? false : value}
                    indicatorColor="primary"
                    textColor="primary"
                  >
                    {MenuItems.map((item, index) =>
                      item.label === 'Cart' ? (
                        <Tab
                          disabled={
                            window.location.hash.slice(1) === item.pathname
                          }
                          style={{ minWidth: 96 }}
                          key={index}
                          to={item.pathname}
                          component={NavLink}
                          classes={{ root: classes.tabItem }}
                          icon={
                            <Badge badgeContent={4} color="primary">
                              <ShoppingCart />
                            </Badge>
                          }
                        />
                      ) : (
                        <Tab
                          disabled={
                            window.location.hash.slice(1) === item.pathname
                          }
                          style={{ minWidth: 96 }}
                          key={index}
                          to={item.pathname}
                          component={NavLink}
                          classes={{ root: classes.tabItem }}
                          label={item.label}
                        />
                      )
                    )}
                  </Tabs>
                </div>

                {props.authenticated !== null && (
                  <>
                    <Tooltip title={`${props.authenticated.username}`}>
                      <Avatar
                        style={{
                          margin: 'auto 10px',
                          backgroundColor: '#0061ff'
                        }}
                      >
                        {props.authenticated.username[0].toUpperCase()}
                      </Avatar>
                    </Tooltip>
                  </>
                )}
              </React.Fragment>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawer} onClose={() => setDrawer(false)}>
        <div style={{ width: 'auto' }}>
          <List>
            {MenuItems.map((menuItem, index) => (
              <ListItem
                onClick={() => setDrawer(false)}
                to={menuItem.pathname}
                component={NavLink}
                button
                key={index}
              >
                <ListItemIcon>
                  <menuItem.menuIcon />
                </ListItemIcon>
                <ListItemText primary={menuItem.label} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  )
}

const mapState = (state: TState) => ({
  authenticated: state.user
})

const Routed = withRouter(connect(mapState)(Topbar))

export const Header = withStyles(styles)(Routed)
