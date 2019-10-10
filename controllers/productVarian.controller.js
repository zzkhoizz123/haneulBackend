const ObjectId = require('bson').ObjectId
const RESPONSE = require('../middlewares/response')
const ERRORCODE = require('../constants/errorCode')
const CONSTANT = require('../constants/constant')

const productVarianService = require('../services/productVarian.service')

const getProductVarian = async (req, res) => {
  try {
    const varianId = req.query.varianId
    const varian = await productVarianService.getDetail({_id: new ObjectId(varianId)})
    ERRORCODE.SUCCESSFUL.data = varian
    RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

module.exports = {
    getProductVarian
}
