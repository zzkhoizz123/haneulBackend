'use strict'
const CONSTANTS = require('../constants/constant')

// Import tools
const  ERRORCODE = require('../constants/errorCode')
const tagModel = require('../models/tag.model')

const create = async (cropInfo) => {
  const data = await tagModel.create(cropInfo)
  return data
}

const update = async (query, newInfo) => {
  const data = await tagModel.findOneAndUpdate(query, { $set: newInfo }, { newc: true })
  return
}

const checkExist = async (query) => {
  const data = await tagModel.findOne(query, { _id: CONSTANTS.APPEARANCE }).lean()
  return !!data
}

const getDetail = async (query, projection = {}) => {
  const data = await tagModel.findOne(query, projection).lean()
  return data
}

const getList = async (query, projection, sort = { createAt: CONSTANTS.APPEARANCE }, offset = 0, limit = CONSTANTS.LIMIT_QUERY) => {
  const data = await tagModel.find(query, projection).sort(sort).skip(offset).limit(limit).lean()
  return data
}

module.exports = {
    create,
    update,
    checkExist,
    getDetail,
    getList
}