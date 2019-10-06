'use strict'
const ObjectId = require('bson').ObjectId;

// Import tools
const  ERRORCODE = require('../constants/errorCode')
const CONSTANTS = require('../constants/constant')
const productModel = require('../models/product.model')

const create = async (cropInfo) => {
  const data = await productModel.create(cropInfo)
  return data
}

const update = async (query, newInfo) => {
  const data = await productModel.findOneAndUpdate(query, { $set: newInfo }, { newc: true })
  return data
}

const checkExist = async (query) => {
  const data = await productModel.findOne(query, { _id: CONSTANTS.APPEARANCE }).lean()
  return !!data
}

const getDetail = async (query, projection = {}) => {
  const data = await productModel.findOne(query, projection).lean()
  return data
}

const getList = async (query, projection, sort = { createAt: CONSTANTS.APPEARANCE }, offset = 0, limit = CONSTANTS.LIMIT_QUERY) => {
  const data = await productModel.find(query, projection).sort(sort).skip(offset).limit(limit).lean()
  return data
}

module.exports = {
    create,
    update,
    checkExist,
    getDetail,
    getList
}