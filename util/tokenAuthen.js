const jwt = require('jsonwebtoken')
const  config = require('../config/server.config')
const generateToken = async (info) => {
  try {
    const token = await jwt.sign(info, config.privateKeyToken, { expiresIn: config.expiredToken })
    return token
  } catch (error) {
    console.log('Generation token', error)
    return null
  }
}

const verifyToken = async (token) => {
  if (!token) {
    return false
  }
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length)
  }
  const decoded = await jwt.verify(token, config.privateKeyToken)
  console.log(decoded)
  return decoded
}

module.exports = {
    generateToken,
    verifyToken
}