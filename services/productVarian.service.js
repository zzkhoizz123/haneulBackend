'use strict'
const ObjectId = require('bson').ObjectId;

// Import tools
const  ERRORCODE = require('../constants/errorCode')
const CONSTANTS = require('../constants/constant')
const productVarianModel = require('../models/productVarian.model')
const productModel = require('../models/product.model')

const create = async (cropInfo) => {
  const data = await productVarianModel.create(cropInfo)
  return data
}

const update = async (query, query2) => {
  const data = await productVarianModel.update(query, query2)
  return
}

const removeVarian = async (varianId) => {
  try {
    await productModel.update({ productVarianID: new ObjectId(varianId) }, {
      $pull: {
        productVarianID: new ObjectId(varianId)
      },
    },
      { multi: true }
    )
    
    await productVarianModel.remove({ _id: new ObjectId(varianId) })
    return ERRORCODE.SUCCESSFUL
  }
  catch(error) {
    return ERRORCODE.ERROR_SERVER
  }
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
    getList,
    removeVarian
}