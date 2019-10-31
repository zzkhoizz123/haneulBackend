'use strict'
const ObjectId = require('bson').ObjectId

// Import tools
const ERRORCODE = require('../constants/errorCode')
const CONSTANTS = require('../constants/constant')
const productModel = require('../models/product.model')
const subcategoryModel = require('../models/subcategory.model')
const tagModel = require('../models/tag.model')
const productVarianModel = require('../models/productVarian.model')

const create = async (cropInfo) => {
  const data = await productModel.create(cropInfo)
  return data
}

const update = async (query, query2) => {
  await productModel.update(query, query2)
  
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

const getProductById = async (id) => {
  try {
    const product = await productModel.findById(id)
    const subcategoryID = product.subcategoryID
    const tagID = product.tagID
    const productVarianID = product.productVarianID

    const subcategoryList = []
    const tagList = []
    const productVarianList = []

    for (const item in subcategoryID) {
      subcategoryList.push(await subcategoryModel.findById(subcategoryID[item]))
    }
    for (const item in tagID) {
      tagList.push(await tagModel.findById(tagID[item]))
    }
    for (const item in productVarianID) {
      productVarianList.push(await productVarianModel.findById(productVarianID[item]))
    }

    ERRORCODE.SUCCESSFUL.data = {
      name: product.name,
      description: product.description,
      picture: product.picture,
      subcategory: subcategoryList,
      tag: tagList,
      productVarian: productVarianList
    }
    return ERRORCODE.SUCCESSFUL
  } catch (error) {
    return ERRORCODE.ERROR_SERVER
  }
}

const getProductBySubcategory = async (subcategoryID) => {
  try {
    const product = productModel.find({ subcategoryID: new ObjectId(subcategoryID) })
    ERRORCODE.SUCCESSFUL.data = product
    return ERRORCODE.SUCCESSFUL
  } catch (error) {
    return ERRORCODE.ERROR_SERVER
  }
}

const getProductByTag = async (tagID) => {
  try {
    const product = productModel.find({ tagID: new ObjectId(tagID) })
    ERRORCODE.SUCCESSFUL.data = product
    return ERRORCODE.SUCCESSFUL
  } catch (error) {
    return ERRORCODE.ERROR_SERVER
  }
}

const removeProduct = async (productid) => {
  try {
    const product = await productModel.findOne({ _id: new ObjectId(productid) })
    if (!product) {
      return ERRORCODE.DATA_NOT_EXISTED
    }
    
    for (let item in product.productVarianID) {
      await productVarianModel.remove({ _id: product.productVarianID[item] })
    }

    await productModel.remove({ _id: new ObjectId(productid) })
    return ERRORCODE.SUCCESSFUL
  } catch (error) {
    return ERRORCODE.ERROR_SERVER
  }
}

module.exports = {
  create,
  update,
  checkExist,
  getDetail,
  getList,
  getProductById,
  getProductBySubcategory,
  getProductByTag,
  removeProduct
}
