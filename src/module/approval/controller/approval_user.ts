import { NextFunction, Request, Response } from 'express'
import mongoose, { PopulateOptions } from 'mongoose'
// import { ObjectId } from 'mongoose.Types'

/* Model */
import ApprovalUser from '../model/approval_user.js'
import User from '../../user/model/index.js'
import Approval from '../model/index.js'

/* Utils */
import { SERVICE, api } from '../../../utils/api.js'
import { errorHandler } from '../../../utils/helpers/errorHandler.js'

/* Interface */
import { IApprovalUser } from '../model/approval.interface.js'

// desc Get a single approval by user id
// @route GET /api/v1/approval/approval-user/user/:id
// @access Private
export const getApprovalByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const populateQuery: PopulateOptions[] = [
      { path: 'user_id', select: '_id name username role is_verified' },
      { path: 'approval_id', select: '_id status approval_type foreign_id' },
    ]
    const approval: IApprovalUser | null = await ApprovalUser.findOne({
      user_id: req.params.id,
    })
      .populate(populateQuery)
      .select('-__v')
    if (approval === null) {
      return res.status(404).json({
        error: {
          code: 404,
          message: 'Approval not found',
        },
      })
    }
    return res.status(200).json({
      data: approval,
    })
  } catch (error) {
    return errorHandler(error, res)
  }
}
// desc create approval user
// @route post /api/v1/approval/approval-user/create
// @access private
export const createApprovalUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const { user_id, approval_id, description, file, images } = req.body

    /* Valdation */
    const user = await User.findById(user_id)
    if (user === null) {
      return res.status(404).json({
        error: {
          code: 404,
          message: `User not found`,
        },
      })
    }

    const approval = await Approval.findById(approval_id)
    if (approval === null) {
      return res.status(404).json({
        error: {
          code: 404,
          message: `Approval not found`,
        },
      })
    }

    if (approval.foreign_id?.toString() !== user_id) {
      return res.status(403).json({
        error: {
          code: 403,
          message:
            'You are not authorized to create this approval, check the data sent again',
        },
      })
    }
    /* uploaded files and images have not been handled  */
    const dataApproval: IApprovalUser = {
      user_id,
      approval_id,
      description,
      file_url: file,
      images_url: images,
    }

    const approvalUser = await ApprovalUser.create(dataApproval)
    await session.commitTransaction()
    session.endSession()

    return res.status(200).json({
      status: 'success',
      content: approvalUser,
    })
  } catch (error) {
    // console.log(error)
    await session.abortTransaction()
    session.endSession()
    return errorHandler(error, res)
  }
}

// desc update approval user
// @route patch /api/v1/approval/approval-user/update/:id
// @access private
export const updateApprovalUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession()
  session.startTransaction()
  try {
    const { id } = req.params // ID of the approval to update
    const { description, file, images } = req.body // Updated data

    // Find the approval by ID
    const existingApprovalUser = await ApprovalUser.findById(id)
    if (!existingApprovalUser) {
      return res
        .status(404)
        .json({ error: { code: 404, message: 'Approval User not found' } })
    }

    const approval = await Approval.findById(existingApprovalUser.approval_id)
    if (approval === null) {
      return res.status(404).json({
        error: {
          code: 404,
          message: `Approval not found`,
        },
      })
    }

    if (
      approval.foreign_id?.toString() !==
      existingApprovalUser?.user_id?.toString()
    ) {
      return res.status(403).json({
        error: {
          code: 403,
          message: 'You are not authorized to update this approval user',
        },
      })
    }
    /* uploaded files and images have not been handled  */
    const dataApproval: IApprovalUser = {
      description,
      file_url: file,
      images_url: images,
    }

    const updatedApproval = await ApprovalUser.findOneAndUpdate(
      { _id: id },
      { $set: dataApproval },
      { new: true }
    )

    await session.commitTransaction()
    session.endSession()

    return res.status(200).json({
      status: 'success',
      // message: 'Approval user updated successfully',
      message: updatedApproval,
    })
  } catch (error) {
    // console.log(error)
    await session.abortTransaction()
    session.endSession()
    return errorHandler(error, res)
  }
}
