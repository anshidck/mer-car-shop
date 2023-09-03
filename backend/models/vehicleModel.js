const mongoose = require('mongoose')

const vehicleSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    desc: {
      type: String,
      required: [true, 'Please add an description'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a Price'],
    },
    primaryImage: {
        type: String,
        required: [true, 'Please add a image'],
    },
    secondaryImage: {
        type: [String],
    },
    quantity: {
      type: Number
    },
    manufacturer: {
        type: String,
        required: [true, 'Please add a manufacturer'],
    },
    model: {
        type: String,
        required: [true, 'Please add a model'],
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Vehicle', vehicleSchema)