const ObjectId = require('bson').ObjectId
const RESPONSE = require('../middlewares/response')
const ERRORCODE = require('../constants/errorCode')
const CONSTANT = require('../constants/constant')

const commentService = require('../services/comment.service')

const createComment = async (req, res) => {
  try {
    const { flag, content, productId, commentParentId } = req.body // productId existed or commentId existed
    const userId = req.id
    if (!userId || !content) {
      return RESPONSE.message(res, ERRORCODE.MISSING_FIELD)
    }
    const result = await commentService.createComment(flag, content, productId, commentParentId, userId)
    return RESPONSE.message(res, result)
  } catch (err) {
    console.log(err)
    return RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const getCommentOfProduct = async (req, res) => {
  try {
    const { flag, productId } = req.body
    if (!flag || !productId) {
      return RESPONSE.message(res, ERRORCODE.MISSING_FIELD)
    }
    const result = await commentService.getCommentOfProduct(flag, productId)
    return RESPONSE.message(res, result)
  } catch (err) {
    console.log(err)
    return RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

module.exports = {
  createComment,
  getCommentOfProduct
}
