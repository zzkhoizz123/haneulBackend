const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
  customerID: {},
  productionID: {}, // [list product],
  state: {}, // 1: draft, 2: confirm, 3: cancelled
  phoneNumber: {},
  address: {},
  message: {}
}, { timestamps: true })

module.exports = mongoose.model('order', orderSchema, 'Order')
