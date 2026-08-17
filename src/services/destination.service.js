// import Destination from '@/models/Destination'

// export async function createDestination(data) {
//   return await Destination.create(data)
// }

// export async function getDestinations() {
//   return await Destination.find().sort({
//     createdAt: -1,
//   })
// }

// export async function getDestinationById(id) {
//   return await Destination.findById(id)
// }

// export async function updateDestination(id, data) {
//   return await Destination.findByIdAndUpdate(
//     id,
//     data,
//     { new: true }
//   )
// }

// export async function deleteDestination(id) {
//   return await Destination.findByIdAndDelete(id)
// }




import Destination from '@/models/Destination'

export async function createDestination(data) {
  return Destination.create(data)
}

// export async function getDestinations() {
//   return Destination.find()
//     .sort({ createdAt: -1 })
//     .lean()
// }

// export async function getDestinations({
//   search = '',
//   status = '',
// } = {}) {
//   const filter = {}

//   if (search) {
//     filter.$or = [
//       {
//         name: {
//           $regex: search,
//           $options: 'i',
//         },
//       },
//       {
//         country: {
//           $regex: search,
//           $options: 'i',
//         },
//       },
//       {
//         region: {
//           $regex: search,
//           $options: 'i',
//         },
//       },
//     ]
//   }

//   if (status) {
//     filter.status = status
//   }

//   return Destination.find(filter)
//     .sort({ createdAt: -1 })
//     .lean()
// }
export async function getDestinations({
  search = '',
  status = '',
  page = 1,
  limit = 10,
} = {}) {
  const filter = {}

  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        country: {
          $regex: search,
          $options: 'i',
        },
      },
      {
        region: {
          $regex: search,
          $options: 'i',
        },
      },
    ]
  }

  if (status) {
    filter.status = status
  }

  const skip = (page - 1) * limit

  const [destinations, total] =
    await Promise.all([
      Destination.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),

      Destination.countDocuments(filter),
    ])

  return {
    destinations,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }
}

export async function getDestinationById(id) {
  return Destination.findById(id).lean()
}

export async function updateDestination(id, data) {
  return Destination.findByIdAndUpdate(
    id,
    data,
    {
      new: true,
      runValidators: true,
    }
  ).lean()
}

export async function deleteDestination(id) {
  return Destination.findByIdAndDelete(id)
}