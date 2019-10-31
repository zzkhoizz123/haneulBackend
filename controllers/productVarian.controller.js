const ObjectId = require('bson').ObjectId
const RESPONSE = require('../middlewares/response')
const ERRORCODE = require('../constants/errorCode')
const CONSTANT = require('../constants/constant')

const productVarianService = require('../services/productVarian.service')

const getProductVarian = async (req, res) => {
  try {
    const varianId = req.query.varianId
    const varian = await productVarianService.getDetail({ _id: new ObjectId(varianId) })
    ERRORCODE.SUCCESSFUL.data = varian
    RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const updateProductVarian = async (req, res) => {
  try {
    if (req.role !== CONSTANT.USER_ROLE.ADMIN) {
      RESPONSE.message(res, ERRORCODE.DO_NOT_HAVE_PERMISSION)
    }
    const { color, size, stock, price, varianId } = req.body

    if (!varianId) {
      RESPONSE.message(res, ERRORCODE.MISSING_FIELD)
    }
    const update = {}
    if (color) update.color = color
    if (size) update.size = size
    if (stock) update.stock = stock
    if (price) update.price = price

    await productVarianService.update({ _id: new ObjectId(varianId) }, {
      $set: update
    })
    RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const removeProductVarian = async (req, res) => {
  try {
    if (req.role !== CONSTANT.USER_ROLE.ADMIN) {
      RESPONSE.message(res, ERRORCODE.DO_NOT_HAVE_PERMISSION)
    }
    const { varianId } = req.body

    const result = await productVarianService.removeVarian(varianId)
    RESPONSE.message(res, result)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

module.exports = {
  getProductVarian,
  updateProductVarian,
  removeProductVarian

}
