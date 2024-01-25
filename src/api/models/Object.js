const mongoose = require('mongoose')

const objectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: 'objects'
  }
)

const Object = mongoose.model('objects', objectSchema, 'objects')
module.exports = Object
