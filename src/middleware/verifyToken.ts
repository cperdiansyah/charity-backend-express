import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_ACCESS_TOKEN_SECRET } from '../utils/index.js'
import { CustomRequest } from './middleware.interface.js'
import { ITokenPayload } from '../types/index.js'
import User from '../module/user/model/index.js'

export const verifyToken = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization']
  const token =
    authHeader && authHeader?.startsWith('Bearer ') && authHeader.split(' ')[1]

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        JWT_ACCESS_TOKEN_SECRET
      ) as ITokenPayload
      if (!decoded.isAuthenticated) {
        return res.status(403).json({
          error: {
            code: 403,
            message: 'Forbidden access',
          },
        })
      }
      const userData: any = await User.findById(decoded.id).select('-password')
      const user = { ...userData._doc, accessToken: token }
      // console.log(user)
      req.body.user = user

      next()
    } catch (error) {
      return res.status(401).json({
        error: {
          code: 401,
          message: 'Unauthorized Token',
        },
      })
    }
  } else {
    return res.status(401).json({
      error: {
        code: 401,
        message: 'You are not authenticated',
      },
    })
  }
}

export const verifyAnonymousToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization']
  const token =
    authHeader && authHeader?.startsWith('Bearer ') && authHeader.split(' ')[1]

  if (token) {
    try {
      jwt.verify(token, JWT_ACCESS_TOKEN_SECRET) as ITokenPayload
      next()
    } catch (error: any) {
      console.log(error)
      return res.status(401).json({
        error: {
          code: 401,
          message: 'Unauthorized Token',
        },
      })
    }
  } else {
    return res.status(401).json({
      error: {
        code: 401,
        message: 'You are not authenticated',
      },
    })
  }
}
