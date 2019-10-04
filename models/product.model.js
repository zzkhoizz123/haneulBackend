const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
  name: {},
  description: {},
  subcategoryID: {}, // [list sub]
  tagID: {}, // [list tag]
  productVarianID: {} // [list varian]
}, { timestamps: true })


module.exports = mongoose.model('product', productSchema, 'Product')
