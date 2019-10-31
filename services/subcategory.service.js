'use strict'
const ObjectId = require('bson').ObjectId;

const CONSTANTS = require('../constants/constant')

// Import tools
const  ERRORCODE = require('../constants/errorCode')
const subcategoryModel = require('../models/subcategory.model')
const categoryModel = require('../models/category.model')

const create = async (Info) => {
  const data = await subcategoryModel.create(Info)
  return data
}

const update = async (query, newInfo) => {
  const data = await subcategoryModel.findOneAndUpdate(query, { $set: newInfo }, { newc: true })
  return
}

const checkExist = async (query) => {
  const data = await subcategoryModel.findOne(query, { _id: CONSTANTS.APPEARANCE }).lean()
  return !!data
}

const getDetail = async (query, projection = {}) => {
  const data = await subcategoryModel.findOne(query, projection).lean()
  return data
}

const getList = async (query, projection, sort = { createAt: CONSTANTS.APPEARANCE }, offset = 0, limit = CONSTANTS.LIMIT_QUERY) => {
  const data = await subcategoryModel.find(query, projection).sort(sort).skip(offset).limit(limit).lean()
  return data
}

const updateSubcategory = async (subcategoryid, subcategoryName) => {
  try {
    await subcategoryModel.update({ _id: new ObjectId(subcategoryid) }, { name: subcategoryName })
    return ERRORCODE.SUCCESSFUL
  }
  catch(error) {
    return ERRORCODE.ERROR_SERVER
  }
}

const removeSubcategory = async (subcategoryid) => {
  try {
    await categoryModel.update({ subList: new ObjectId(subcategoryid) }, {
      $pull: {
        subList: new ObjectId(subcategoryid)
      },
    },
      { multi: true }
    )
    
    await subcategoryModel.remove({ _id: new ObjectId(subcategoryid) })
    return ERRORCODE.SUCCESSFUL
  }
  catch(error) {
    return ERRORCODE.ERROR_SERVER
  }
}

module.exports = {
    create,
    update,
    checkExist,
    getDetail,
    getList,
    updateSubcategory,
    removeSubcategory
}