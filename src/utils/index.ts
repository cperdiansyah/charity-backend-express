import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

export const {
  MONGODB_URI: MONGODB_URI = '',
  NODE_ENV,
  PORT = 5000,
  CORS_OPEN = '',
  CORS_LOCAL = '',
  JWT_ACCESS_TOKEN_SECRET = '',
  JWT_REFRESH_TOKEN_SECRET = '',
  ACCESS_TOKEN_EXPIRED,
  REFRESH_TOKEN_EXPIRED,
} = process.env

export const __dirname = path.resolve()
