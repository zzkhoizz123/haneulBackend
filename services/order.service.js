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
  const data = await orderModel.update(query, query2)
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
  let orders = await orderModel.find(query, projection).lean()
  
  for (let item1 in orders) {
    let lst = []
    let productList = []
    let order = orders[item1]
    for (let item2 in order.productVarianList) {
      let varian = await productVarianModel.findOne({ _id: new ObjectId(order.productVarianList[item2].productVarianID) })
      let product = await productModel.findOne({ productVarianID: new ObjectId(order.productVarianList[item2].productVarianID) })
      lst.push({
        varian,
        number: order.productVarianList[item2].number
      })
      productList.push(product)
    }
    orders[item1].productVarian = lst
    orders[item1].product = productList
  }
  
  return orders
}

const getOrderByCustomerId = async (customerId, orderId) => {
    const data = await orderModel.findOne({customerID: customerId, _id: new ObjectId(orderId)})
    const varian = data.productVarianList
    const lst = []
    for (let item in varian) {
        const temp = await productVarianModel.findOne({_id: new ObjectId(varian[item].productVarianID)})
                    .populate({
                        path: 'productID',
                        select: '-__v',
                        model: productModel
                    })
        lst.push({
          varian: temp,
          number: varian[item].number
        })
    }
    
    data.productVarianList = lst 
    return data
}

const getOrderByAdmin = async (orderId) => {
  const data = await orderModel.findOne({ _id: new ObjectId(orderId)})
  const varian = data.productVarianList
  const lst = []
  for (let item in varian) {
      const temp = await productVarianModel.findOne({_id: new ObjectId(varian[item].productVarianID)})
      lst.push({ 
        varian: temp,
        number: varian[item].number
      })
  }
  
  data.productVarianList = lst 
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