import { NextFunction, Request, Response } from 'express'

import { MidtransClient } from 'midtrans-node-client'
import dotenv from 'dotenv'
import crypto from 'crypto'

dotenv.config()

import {
  MIDTRANS_CLIENT_KEY,
  MIDTRANS_SERVER_KEY,
} from '../../../utils/index.js'
import { errorHandler } from '../../../utils/helpers/errorHandler.js'
import Transaction from '../model/index.js'
import mongoose from 'mongoose'
import User from '../../user/model/index.js'
import Charity from '../../charity/model/index.js'
import { api } from '../../../utils/api.js'
import { ITransaction } from '../model/transaction.interface.js'
import { processTransaction } from '../../payment/general/controller/index.js'

// desc create charity payment
// @route GET /api/v1/payment/charity/list
// @access Private
export const getAllCharityPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { getAll, id_charities } = req.query
    const query: any = {}
    if (req.query.status) {
      query.status = req.query.status
    }
    if (id_charities) {
      query.campaign_id = { $in: id_charities }
    }
    const totalCount = await Transaction.countDocuments(query)

    if (!getAll) {
      const page = parseInt(req.query.page as string) || 1
      const rows = parseInt(req.query.rows as string) || 10

      const totalPages = Math.ceil(totalCount / rows)

      const payment = await Transaction.find(query)
        .sort({ createdAt: 1 })
        .skip((page - 1) * rows)
        .limit(rows)
        // .populate('user_id')
        .populate('campaign_id', 'title slug') // Populate the 'campaign_id' field with 'name' attribute from the Charity model
        .populate('user_id', 'name email') // Populate the 'user_id' field with 'name' and 'email' attributes from the User model

        .select('-__v')
        .exec()

      // const total = payment.

      return res.status(200).json({
        campaignPayment: payment,
        meta: {
          page,
          rows,
          totalPages,
          total: totalCount,
        },
      })
    } else {
      const payment = await Transaction.find(query)
        .sort({ createdAt: 1 })

        // .populate('user_id')
        .populate('campaign_id', 'title slug') // Populate the 'campaign_id' field with 'name' attribute from the Charity model
        .populate('user_id', 'name email') // Populate the 'user_id' field with 'name' and 'email' attributes from the User model

        .select('-__v')
        .exec()

      return res.status(200).json({
        campaignPayment: payment,
        meta: {
          total: totalCount,
        },
      })
    }
  } catch (error) {
    return errorHandler(error, res)
  }
}
// desc get charity payment detail
// @route GET /api/v1/payment/charity/:id
// @access Private
export const getPaymentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payment = await Transaction.findById(req.params.id)
      // .populate('user_id')
      .populate('campaign_id', 'title slug') // Populate the 'campaign_id' field with 'name' attribute from the Charity model
      .populate('user_id', 'name email') // Populate the 'user_id' field with 'name' and 'email' attributes from the User model
      .select('-__v')
      .exec()
    if (payment === null) {
      return res.status(404).json({
        error: {
          code: 404,
          message: 'Payment not found',
        },
      })
    }
    return res.status(200).json({
      payment: payment,
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}

// desc get Payment by id charity
// @route GET /api/v1/payment/charity/list
// @access Private
export const gePaymentByIdCharity = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { getAll } = req.query

    const query: any = {
      campaign_id: req.params.id,
    }
    if (req.query.status) {
      query.status = req.query.status
    }
    const totalCount = await Transaction.countDocuments(query)

    if (!getAll) {
      const page = parseInt(req.query.page as string) || 1
      const rows = parseInt(req.query.rows as string) || 10

      const totalPages = Math.ceil(totalCount / rows)
      // const currentDate = new Date()

      const payment = await Transaction.find(query)
        .sort({ createdAt: 1 })
        .skip((page - 1) * rows)
        .limit(rows)
        // .populate('user_id')
        .populate('campaign_id', 'title slug') // Populate the 'campaign_id' field with 'name' attribute from the Charity model
        .populate('user_id', 'name email') // Populate the 'user_id' field with 'name' and 'email' attributes from the User model

        .select('-__v')
        .exec()

      return res.status(200).json({
        campaignPayment: payment,
        meta: {
          page,
          rows,
          totalPages,
          total: totalCount,
        },
      })
    } else {
      const payment = await Transaction.find(query)
        .sort({ createdAt: 1 })
        // .populate('user_id')
        .populate('campaign_id', 'title slug') // Populate the 'campaign_id' field with 'name' attribute from the Charity model
        .populate('user_id', 'name email') // Populate the 'user_id' field with 'name' and 'email' attributes from the User model

        .select('-__v')
        .exec()

      return res.status(200).json({
        campaignPayment: payment,
        meta: {
          total: totalCount,
        },
      })
    }
  } catch (error) {
    return errorHandler(error, res)
  }
}
// desc create Payment by id user
// @route GET /api/v1/payment/charity/list
// @access Private
export const getPaymentByIdUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { getAll } = req.query
    const query: any = {
      user_id: req.params.id,
    }
    if (req.query.status) {
      query.status = req.query.status
    }
    const totalCount = await Transaction.countDocuments(query)

    if (!getAll) {
      const page = parseInt(req.query.page as string) || 1
      const rows = parseInt(req.query.rows as string) || 10

      const totalPages = Math.ceil(totalCount / rows)
      // const currentDate = new Date()

      const payment = await Transaction.find(query)
        .sort({ createdAt: 1 })
        .skip((page - 1) * rows)
        .limit(rows)
        // .populate('user_id')
        .populate('campaign_id', 'title slug') // Populate the 'campaign_id' field with 'name' attribute from the Charity model
        .populate('user_id', 'name email') // Populate the 'user_id' field with 'name' and 'email' attributes from the User model

        .select('-__v')
        .exec()

      return res.status(200).json({
        campaignPayment: payment,
        meta: {
          page,
          rows,
          totalPages,
          total: totalCount,
        },
      })
    } else {
      const payment = await Transaction.find(query)
        .sort({ createdAt: 1 })
        // .populate('user_id')
        .populate('campaign_id', 'title slug') // Populate the 'campaign_id' field with 'name' attribute from the Charity model
        .populate('user_id', 'name email') // Populate the 'user_id' field with 'name' and 'email' attributes from the User model

        .select('-__v')
        .exec()

      return res.status(200).json({
        campaignPayment: payment,
        meta: {
          total: totalCount,
        },
      })
    }
  } catch (error) {
    return errorHandler(error, res)
  }
}

export const chargeTransaction = async (req: Request, res: Response) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const snap = new MidtransClient.Snap({
      isProduction: false,
      serverKey: MIDTRANS_SERVER_KEY,
      clientKey: MIDTRANS_CLIENT_KEY,
    })
    const {
      user_id,
      campaign_id,
      quantity = 1,
      amount,
      transaction_type,
    } = req.body
    /* Check user and charity is exist */
    const user = await User.findOne({
      _id: user_id,
    })
    if (!user) {
      return res.status(404).json({
        error: {
          code: 404,
          message: 'User not found',
        },
      })
    }
    const charity = await Charity.findOne({
      _id: campaign_id,
    })

    if (!charity) {
      return res.status(404).json({
        error: {
          code: 404,
          message: 'Charity not found',
        },
      })
    }
    /* End check */

    /* Check amount is noit 0 or is number */
    if (amount === 0) {
      return res.status(400).json({
        error: {
          code: 400,
          message: 'amount must be greater than 0',
        },
      })
    } else if (typeof amount !== 'number') {
      return res.status(400).json({
        error: {
          code: 400,
          message: 'amount must be in the form of a number',
        },
      })
    }

    /* Create Midtrans Payment */
    const clientHost =
      process.env.NODE_ENV?.trim() === 'development'
        ? process.env.CORS_LOCAL
        : process.env.CORS_OPEN

    const dataPayment: ITransaction = {
      user_id,
      campaign_id,
      quantity,
      amount,
      status: 'pending',
      transaction_type,
    }

    /* Create payment campaign */
    const DataTransaction = await Transaction.create(dataPayment)
    const dataMidtransCharge = {
      transaction_details: {
        order_id: DataTransaction._id,
        gross_amount: DataTransaction.amount,
      },
      customer_details: {
        first_name: user.name.split(' ')[0],
        last_name: user.name.split(' ')[1] || '',
        email: user.email,
      },
      item_details: [
        {
          id: String(charity._id),
          price: DataTransaction.amount,
          quantity: 1,
          name: charity.title,
          url: `${clientHost}/campaign/${charity.slug}`,
        },
      ],
    }
    const midtransCharge = await snap
      .createTransaction(dataMidtransCharge)
      .then((transaction) => {
        return transaction
      })

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      DataTransaction.id,
      { response_midtrans: midtransCharge },
      { new: true }
    )
    // const transaction = await Transaction.findById(DataTransaction.id)

    console.log(updatedTransaction)

    await session.commitTransaction()
    session.endSession()

    return res.status(200).json({
      status: 'success',
      message: 'Payment campaign created successfully',
      content: updatedTransaction,
    })
  } catch (error) {
    console.log(error)
    await session.abortTransaction()
    session.endSession()
    return errorHandler(error, res)
  }
}