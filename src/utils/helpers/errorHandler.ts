import { Request, Response, NextFunction } from 'express'

export const errorHandler = (err: any, res: Response) => {
  console.log(err)
  if (err.code === 500) {
    // Handle server error (500)
    return res
      .status(500)
      .json({
        error: {
          code: 500,
          message: 'Internal server error',
        },
      })
      .end()
  } else if (err.code === 404) {
    // Handle not found error (404)
    return res
      .status(404)
      .json({
        error: {
          code: 404,
          message: 'Not found',
        },
      })
      .end()
  } else if (res.statusCode === 400) {
    // Handle other errors (400)
    return res
      .status(400)
      .json({
        error: {
          code: 400,
          message: 'Bad request',
        },
      })
      .end()
  } else {
    return res
      .status(400)
      .json({
        error: {
          code: 400,
          error: err,
        },
      })
      .end()
  }
}
