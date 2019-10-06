const mongoose = require('mongoose')

const Schema = mongoose.Schema

const subcategorySchema = new Schema({
  name: {}
}, { timestamps: true })

module.exports = mongoose.model('subcategory', subcategorySchema, 'Subcategory')
