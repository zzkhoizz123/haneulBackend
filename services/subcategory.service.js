'use strict'
const CONSTANTS = require('../constants/constant')

// Import tools
const  ERRORCODE = require('../constants/errorCode')
const subcategoryModel = require('../models/subcategory.model')

const create = async (cropInfo) => {
  const data = await subcategoryModel.create(cropInfo)
  return data
}

const update = async (query, newInfo) => {
  const data = await subcategoryModel.findOneAndUpdate(query, { $set: newInfo }, { newc: true })
  return data
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

module.exports = {
    create,
    update,
    checkExist,
    getDetail,
    getList
}