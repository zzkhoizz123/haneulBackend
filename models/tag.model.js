const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tagSchema = new Schema({
  name: {},
}, { timestamps: true })

module.exports = mongoose.model('tag', tagSchema, 'Tag')
