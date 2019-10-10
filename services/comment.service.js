'use strict'
const CONSTANTS = require('../constants/constant')
const ObjectId = require('bson').ObjectId

// Import tools
const  ERRORCODE = require('../constants/errorCode')
const commentModel = require('../models/comment.model')

const create = async (cropInfo) => {
  const data = await commentModel.create(cropInfo)
  return data
}

const update = async (query, newInfo) => {
  const data = await commentModel.findOneAndUpdate(query, { $set: newInfo }, { newc: true })
  return
}

const checkExist = async (query) => {
  const data = await commentModel.findOne(query, { _id: CONSTANTS.APPEARANCE }).lean()
  return !!data
}

const getDetail = async (query, projection = {}) => {
  const data = await commentModel.findOne(query, projection).lean()
  return data
}

const getList = async (query, projection, sort = { createAt: CONSTANTS.APPEARANCE }, offset = 0, limit = CONSTANTS.LIMIT_QUERY) => {
  const data = await commentModel.find(query, projection).sort(sort).skip(offset).limit(limit).lean()
  return data
}

const createComment = async (flag, content, productId, commentParentId, userId) => {
    try {
        const comment = await commentModel.create({
            content,
            flag,
            userID: userId,
            productID: productId,
            commentParentID: commentParentId
        })
    
        ERRORCODE.SUCCESSFUL.data = comment
        return ERRORCODE.SUCCESSFUL
    } catch (error) {
        return ERRORCODE.ERROR_SERVER
    }  
}

const getCommentOfProduct = async ( flag, productId ) => {
    try {
        const commentList = await commentModel.find({ $and: [
            { flag },
            { productID: productId},
            { commentParentID: { $exists: false } } 
        ] }).lean()
        const lst = []
        for (const item in commentList) {
            const temp = await commentModel.find({ commentParentID: commentList[item]._id.toString() })
            commentList[item].child = temp
            lst.push(commentList[item])
        }

        ERRORCODE.SUCCESSFUL.data = lst
        return ERRORCODE.SUCCESSFUL
    } catch (error) {
        console.log(error)
        return ERRORCODE.ERROR_SERVER
    }
}
module.exports = {
    create,
    update,
    checkExist,
    getDetail,
    getList,
    createComment,
    getCommentOfProduct
}