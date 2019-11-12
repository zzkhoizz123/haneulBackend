const mongoose = require('mongoose')
const CONSTANT = require('../constants/constant')

const Schema = mongoose.Schema

const orderSchema = new Schema({
  customerID: {},
  productVarianID: {}, // [list product varian],
  productVarianList: {}, // [list product varian],
  state: { type: Number, default: CONSTANT.ORDER_STATE.DRAFT }, // 1: draft, 2: confirm, 3: cancelled
  phoneNumber: {},
  address: {},
  message: {},
  totalPrice: {}
}, { timestamps: true })

module.exports = mongoose.model('order', orderSchema, 'Order')
