const jwt = require('jsonwebtoken')
const serverConfig =  require('../config/server.config')
const ERRORCODE = require('../constants/errorCode')
const RESPONSE = require('../middlewares/response')

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers['x-access-token'] || req.headers['authorization'] // Express headers are auto converted to lowercase
    if (!token) {
      RESPONSE.message(res, ERRORCODE.MISSING_TOKEN)
    }
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length)
    }

    const decoded = await jwt.verify(token, serverConfig.privateKeyToken)
    if (decoded) {
      req.id = decoded._id
      req.username = decoded.username
      req.active = decoded.active
      req.role = decoded.role
      return next()
    }
    return RESPONSE.message(res, ERRORCODE.INVALID_TOKEN)
  } catch (error) {
    console.log('verifyToken error', error)
    return RESPONSE.message(res, ERRORCODE.INVALID_TOKEN)
  }
}

module.exports = {
  verifyToken
}