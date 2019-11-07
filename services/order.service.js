'use strict'
const ObjectId = require('bson').ObjectId

const CONSTANTS = require('../constants/constant')

// Import tools
const  ERRORCODE = require('../constants/errorCode')
const orderModel = require('../models/order.model')
const productModel = require('../models/product.model')
const productVarianModel = require('../models/productVarian.model')

const create = async (cropInfo) => {
  const data = await orderModel.create(cropInfo)
  return data
}

const update = async (query, query2) => {
  const data = await orderModel.findOneAndUpdate(query, query2, { newc: true })
  return
}

const checkExist = async (query) => {
  const data = await orderModel.findOne(query, { _id: CONSTANTS.APPEARANCE }).lean()
  return !!data
}

const getDetail = async (query, projection = {}) => {
  const data = await orderModel.findOne(query, projection).lean()
  return data
}

const getList = async (query, projection, sort = { createAt: CONSTANTS.APPEARANCE }, offset = 0, limit = CONSTANTS.LIMIT_QUERY) => {
  const data = await orderModel.find(query, projection).sort(sort).skip(offset).limit(limit).lean()
  return data
}

const getOrderByCustomerId = async (customerId, orderId) => {
    const data = await orderModel.findOne({customerID: customerId, _id: new ObjectId(orderId)})
    console.log(data)
    const varian = data.productVarianID
    const lst = []
    for (let item in varian) {
        const temp = await productVarianModel.findOne({_id: new ObjectId(varian[item])})
                    .populate({
                        path: 'productID',
                        select: '-__v',
                        model: productModel
                    })
        lst.push(temp)
    }
    
    data.productVarianID = lst 
    return data
}

const getOrderByAdmin = async (orderId) => {
  const data = await orderModel.findOne({ _id: new ObjectId(orderId)})
  console.log(data)
  const varian = data.productVarianID
  const lst = []
  for (let item in varian) {
      const temp = await productVarianModel.findOne({_id: new ObjectId(varian[item])})
      lst.push(temp)
  }
  
  data.productVarianID = lst 
  return data
}


module.exports = {
    create,
    update,
    checkExist,
    getDetail,
    getList,
    getOrderByCustomerId,
    getOrderByAdmin,
}