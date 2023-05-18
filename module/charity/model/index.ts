import mongoose, { Schema } from 'mongoose'
import { ICharity, ICharityMedia } from './charityInterface'


const media: Schema<ICharityMedia> = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  content_type: {
    type: String,
    required: true,
    default: 'image',
  },
})

const charitySchema: Schema<ICharity> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
    },
    slug: {
      type: String,
      required: [true, 'slug is required'],
    },
    description: {
      type: String,
      required: [true, 'description is required'],
    },
    status: {
      type: String,
      required: [true, 'status is required'],
    },
    is_draft: {
      type: Boolean,
      default: false,
    },
    donation_target: {
      type: Number,
      min: 0,
      required: [true, 'donation target is required'],
    },
    start_date: {
      type: Date,
      default: Date.now,
    },
    end_date: {
      type: Date,
      default: null,
    },
    post_date: {
      type: Date,
      default: null,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'author is required'],
      ref: 'User',
    },
    media: {
      type: [media],
      default: null,
    },
  },
  { timestamps: true }
)


const Charity = mongoose.model<ICharity>('Charity', charitySchema)

export default Charity
