'use strict'
const ObjectId = require('bson').ObjectId;

// Import tools
const  ERRORCODE = require('../constants/errorCode')
const CONSTANTS = require('../constants/constant')
const productVarianModel = require('../models/productVarian.model')

const create = async (cropInfo) => {
  const data = await productVarianModel.create(cropInfo)
  return data
}

const update = async (query, newInfo) => {
  const data = await productVarianModel.findOneAndUpdate(query, { $set: newInfo }, { newc: true })
  return
}

const checkExist = async (query) => {
  const data = await productVarianModel.findOne(query, { _id: CONSTANTS.APPEARANCE }).lean()
  return !!data
}

const getDetail = async (query, projection = {}) => {
  const data = await productVarianModel.findOne(query, projection).lean()
  return data
}

const getList = async (query, projection, sort = { createAt: CONSTANTS.APPEARANCE }, offset = 0, limit = CONSTANTS.LIMIT_QUERY) => {
  const data = await productVarianModel.find(query, projection).sort(sort).skip(offset).limit(limit).lean()
  return data
}

module.exports = {
    create,
    update,
    checkExist,
    getDetail,
    getList
}