const mongoose = require('mongoose')

const Schema = mongoose.Schema

const rateSchema = new Schema({
  productID: {},
  customerID: {},
  rating: {}
}, { timestamps: true })

module.exports = mongoose.model('rate', rateSchema, 'Rate')
