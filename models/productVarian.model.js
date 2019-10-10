const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productVarianSchema = new Schema({
  color: {},
  size: {},
  stock: {}, 
  price: {},
  productID: {}
}, { timestamps: true })


module.exports = mongoose.model('productVarian', productVarianSchema, 'ProductVarian')
