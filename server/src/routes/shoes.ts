import { ShoeModel, Shoe } from './../mongo/shoe'
import { Request, Response, NextFunction } from 'express'

export const SHOE_ROUTE_PATH = '/shoes'

export interface getShoeReturn {
  shoes: typeof Shoe
}

/**
 * USER MUST BE AN ADMIN TO ACCESS MOST SHOE ROUTES
 */

export const getShoes = async (req: Request, res: Response) => {
  try {
    const shoes = await ShoeModel.find()

    console.log(shoes)

    if (shoes.length) {
      res.json({ shoes })
    }
  } catch (err) {
    console.log('catch 1', err)
    res.status(500)
  }
}

export const createShoe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (err) {
    console.log('catch 2', err)
  }
}
