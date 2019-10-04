const axios = require('axios')
const qs = require('querystring')

const serverConfig = require('./../config/server.config')
const RESPONSE = require('./../middlewares/response')
const ERRORCODE = require('./../constants/errorCode')

const CustomerModel = require('./../models/customer.model')

const getCustomer = async (req, res) => {
  try {
    const { supplierID, nguoiDungID } = req.query
    if (!supplierID || !nguoiDungID) {
      RESPONSE.message(res, ERRORCODE.MISSING_FIELD)
    }

    const response = await axios.request({
      method: 'POST',
      url: '/',
      baseURL: serverConfig.providerAPI_URL,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      auth: { username: serverConfig.providerUsername, password: serverConfig.providerPassword },
      data: qs.stringify({
        function: 'getCustomer',
        supplierID: supplierID, // "04092019DSA000001",
        nguoiDungID: nguoiDungID // "2",
      })
    })

    const existedCustomer = await CustomerModel.findOne({ supplierID: response.data.Data.supplierID })
    if (!existedCustomer) {
      await CustomerModel.create(response.data.Data)
    }
    // console.log(existedCustomer)
    ERRORCODE.SUCCESSFUL.data = response.data.Data
    RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    // console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}
module.exports = {
  getCustomer
}
