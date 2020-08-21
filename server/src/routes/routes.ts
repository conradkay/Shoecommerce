import { User, UserModel, comparePassword } from '../mongo/user'
import express, { NextFunction, Request, Response } from 'express'
import uuid from 'uuid'
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const router = express.Router()

const USER_ROUTE_PATH = '/user'

interface UserRouteReq extends Request {
  body: User
}

interface RegisterRouteReq extends Request {
  body: {
    username: string
    password: string
    email: string
  }
}

interface LoginRouteReq extends Request {
  body: {
    password: string
    email: string
  }
}

interface UserRouteRes extends Response {
  data: {
    user: User
  }
}

export const getUser = async (
  req: UserRouteReq
): Promise<{ user: User | null }> => {
  const user = await UserModel.findOne({ id: req.body.id })

  return user ? user.toObject() : null
}

const getUserHandler = async (
  req: UserRouteReq,
  res: UserRouteRes,
  next: NextFunction
) => {
  try {
    const data = await getUser(req)
    res.json({ data: { user: data } })
  } catch (err) {
    next(err)
  }
}

const registerHandler = async (
  req: RegisterRouteReq,
  res: UserRouteRes,
  next: NextFunction
) => {
  try {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    const userId = uuid()

    const registeredUser = await UserModel.create({
      password: password,
      id: userId,
      email: req.body.email,
      username: req.body.username
    })

    const registeredUserObj = registeredUser.toObject()

    const token = jsonwebtoken.sign(
      { id: registeredUserObj.id },
      process.env.PRIVATE!,
      { expiresIn: '3d' }
    )
    res.cookie('auth-token', token, { httpOnly: true })

    res.json({ user: registeredUserObj })
  } catch (err) {
    next(err)
  }
}

const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie('auth-token')
    res.status(200)
    res.json({})
  } catch (err) {}
}

const loginHandler = async (
  req: LoginRouteReq,
  res: UserRouteRes,
  next: NextFunction
) => {
  try {
    const userFromAuthToken: User | null = jsonwebtoken.decode(
      req.cookies['auth-token']
    ) as any
    if (userFromAuthToken) {
      req.body.email = userFromAuthToken.id
    } else if (!req.body.email) {
      throw new Error('Invalid Token')
    }

    const user = await UserModel.findOne({ email: req.body.email })

    if (user && userFromAuthToken) {
      res.json({ user: user.toObject() })
    } else if (user) {
      const passwordMatch = await comparePassword(
        req.body.password,
        user.password!
      )
      if (passwordMatch && res) {
        const token = jsonwebtoken.sign({ id: user.id }, process.env.PRIVATE!, {
          expiresIn: '1d'
        })

        res.cookie('auth-token', token, { httpOnly: true })

        res.json({ user: user.toObject() })
      }
      throw new Error('Incorrect Password')
    }
    throw new Error('User with Email does not exist')
  } catch (err) {
    next(err)
  }
}

router.get(USER_ROUTE_PATH, getUserHandler)
router.post(USER_ROUTE_PATH + '/register', registerHandler)
router.post(USER_ROUTE_PATH + '/login', loginHandler)
router.post(USER_ROUTE_PATH + '/logout', logoutHandler)

export default router
