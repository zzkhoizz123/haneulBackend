const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productVarianSchema = new Schema({
  varian: {}, // [color, size]
  stock: {}, 
  price: {}
}, { timestamps: true })


module.exports = mongoose.model('productVarian', productVarianSchema, 'ProductVarian')
