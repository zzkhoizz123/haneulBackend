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
  return
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
    const product = await productModel.findOne({ _id: new ObjectId(id) })
    const subcategoryID = product.subcategoryID
    const tagID = product.tagID
    const productVarianID = product.productVarianID

    const subcategoryList = []
    const tagList = []
    const productVarianList = []

    for (const item in subcategoryID) {
      subcategoryList.push(await subcategoryModel.findOne({ _id: new ObjectId(subcategoryID[item]) }))
    }
    for (const item in tagID) {
      tagList.push(await tagModel.findOne({ _id: new ObjectId(tagID[item]) }))
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
    console.log(eror)
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

const getProductByTime = async (productid) => {
  try {
    const products = await productModel.find({})
    
    for (let item in products) {
      const product = products[item]
      let lst = []
      for (let item2 in product.productVarianID) {
        const productVarian = await productVarianModel.findOne({ _id: product.productVarianID[item2] })
        lst.push(productVarian)
      }
      products[item].productVarianID = lst
    }

    ERRORCODE.SUCCESSFUL.data = products
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
  getProductById,
  getProductBySubcategory,
  getProductByTag,
  removeProduct,
  getProductByTime
}
