import mongoose from 'mongoose'

const destinationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
    },

    region: {
      type: String,
      default: '',
    },

    shortDescription: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    featuredImage: {
      type: String,
      default: '',
    },

    galleryImages: [
      {
        type: String,
      },
    ],

    seoTitle: String,

    seoDescription: String,

    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Destination ||  mongoose.model('Destination', destinationSchema)