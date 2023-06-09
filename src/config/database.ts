// const mongoose = require('mongoose')
import mongoose, { ConnectOptions } from 'mongoose'
// import asyncHandler from 'express-async-handler'

import { MONGODB_URI } from '../utils/index.js'

// const dbConnect = asyncHandler(async (req, res, next) => {
//   try {
//     const conn = await mongoose.connect(MONGODB_URI, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//     } as ConnectOptions)

//     console.log(`MongoDB Connected : ${conn.connection.host}`)
//   } catch (err: any) {
//     console.error(err.message)
//     process.exit(1)
//   }
// })

// export default dbConnect
const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as ConnectOptions)

    console.log(`MongoDB Connected : ${conn.connection.host}`)
  } catch (err: any) {
    console.error(err.message)
    process.exit(1)
  }
}

export default dbConnect
// module.exports = dbConnect
