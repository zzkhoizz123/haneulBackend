const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
  content: {},
  flag: {}, // 1: Q&A, 2: review
  userID: {},
  productID: {},
  commentParentID: {}, // comment parent
}, { timestamps: true })

module.exports = mongoose.model('comment', commentSchema, 'Comment')
