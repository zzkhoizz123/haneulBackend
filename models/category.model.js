const mongoose = require('mongoose')

const Schema = mongoose.Schema

const categorySchema = new Schema({
  name: {},
}, { timestamps: true })

module.exports = mongoose.model('category', categorySchema, 'Category')
