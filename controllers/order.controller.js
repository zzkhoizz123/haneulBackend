const ObjectId = require('bson').ObjectId
const RESPONSE = require('../middlewares/response')
const ERRORCODE = require('../constants/errorCode')
const CONSTANT = require('../constants/constant')

const orderService = require('../services/order.service')
const productVarianService = require('../services/productVarian.service')

const createOrder = async (req, res) => {
  try {
    const { productVarianList, phoneNumber, address, message, totalPrice } = req.body
    const customerId = req.id
    const data = await orderService.create({
      customerID: customerId,
      productVarianList: productVarianList,
      phoneNumber: phoneNumber,
      address: address,
      message: message,
      totalPrice: totalPrice
    })
    if (data) {
      for (let item in productVarianList){
        let number = - parseInt(productVarianList[item].number)
        await productVarianService.update({ _id: new ObjectId(productVarianList[item].productVarianID) }, { $inc: { stock: number } })
      }
    }

    ERRORCODE.SUCCESSFUL.data = data
    RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const draftOrder = async (req, res) => {
  try {
    const orderId = req.body.orderId
    await orderService.update({ _id: new ObjectId(orderId) }, { $set: { state: CONSTANT.ORDER_STATE.DRAFT } })
    RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const confirmOrder = async (req, res) => {
  try {
    if (req.role !== CONSTANT.USER_ROLE.ADMIN) {
      RESPONSE.message(res, ERRORCODE.DO_NOT_HAVE_PERMISSION)
    }
    const orderId = req.body.orderId
    await orderService.update({ _id: new ObjectId(orderId) }, { $set: { state: CONSTANT.ORDER_STATE.CONFIRMED } })
    RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const cancelledOrder = async (req, res) => {
  try {
    const orderId = req.body.orderId
    await orderService.update({ _id: new ObjectId(orderId) }, { $set: { state: CONSTANT.ORDER_STATE.CANCELLED } })
    RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const getOrder = async (req, res) => {
  try {
    const orderId = req.query.orderId
    const customerId = req.id
    const role = req.role
    let data
    if (role == CONSTANT.USER_ROLE.ADMIN) {
       data = await orderService.getOrderByAdmin(orderId)
    }
    else {
       data = await orderService.getOrderByCustomerId(customerId, orderId)
    }
    
    ERRORCODE.SUCCESSFUL.data = data
    return RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    return RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const getOrderList = async (req, res) => {
  try {
    const customerId = req.id
    const role = req.role
    let data
    if (role == CONSTANT.USER_ROLE.ADMIN) {
       data = await orderService.getList({})
    }
    else {
      data = await orderService.getList({ customerID: customerId })
    }
    ERRORCODE.SUCCESSFUL.data = data
    return RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    return RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

module.exports = {
  createOrder,
  draftOrder,
  confirmOrder,
  cancelledOrder,
  getOrder,
  getOrderList
}
