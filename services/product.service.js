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
    let stock = 0
    let averagePrice = 0
    for (const item in productVarianID) {
      let productVarian = await productVarianModel.findOne({ _id: productVarianID[item] })
      productVarianList.push(productVarian)
      stock += parseInt(productVarian.stock)
      averagePrice += parseInt(productVarian.price)
    }
    averagePrice = averagePrice / productVarianID.length
    ERRORCODE.SUCCESSFUL.data = {
      name: product.name,
      description: product.description,
      imageURL: product.imageURL,
      subcategory: subcategoryList,
      tag: tagList,
      productVarian: productVarianList,
      averagePrice,
      stock
    }
    return ERRORCODE.SUCCESSFUL
  } catch (error) {
    console.log(eror)
    return ERRORCODE.ERROR_SERVER
  }
}

const getProductBySubcategory = async (subcategoryID) => {
  try {
    const product = await productModel.find({ subcategoryID: subcategoryID })
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
    const products = await productModel.find({}).lean()
    
    for (let item in products) {
      const product = products[item]
      let stock = 0
      let averagePrice = 0
      let lst = []

      for (let item2 in product.productVarianID) {
        const productVarian = await productVarianModel.findOne({ _id: product.productVarianID[item2] })
        averagePrice += parseInt(productVarian.price)
        stock += parseInt(productVarian.stock)
        lst.push(productVarian)
      }

      let lstSubcate = []
      for (let item3 in product.subcategoryID) {
        const sub = await subcategoryModel.findOne({ _id: new ObjectId(product.subcategoryID[item3]) })
        lstSubcate.push(sub)
      }

      products[item].averagePrice = averagePrice / products[item].productVarianID.length
      products[item].stock = stock
      products[item].productVarian = lst
      products[item].subcategory = lstSubcate
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
