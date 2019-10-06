'use strict'
const CONSTANTS = require('../constants/constant')
const tokenAuthen = require('../util/tokenAuthen')

// Import tools
const  ERROR = require('../constants/errorCode')
const userModel = require('../models/user.model')

const create = async (cropInfo) => {
  const data = await userModel.create(cropInfo)
  return data
}

const update = async (query, newInfo) => {
  const data = await userModel.findOneAndUpdate(query, { $set: newInfo }, { newc: true })
  // return data
}

const checkExist = async (query) => {
  const data = await userModel.findOne(query, { _id: CONSTANTS.APPEARANCE }).lean()
  return !!data
}

const getDetail = async (query, projection = {}) => {
  const data = await userModel.findOne(query, projection).lean()
  return data
}

const getList = async (query, projection, sort = { createAt: CONSTANTS.APPEARANCE }, offset = 0, limit = CONSTANTS.LIMIT_QUERY) => {
  const data = await userModel.find(query, projection).sort(sort).skip(offset).limit(limit).lean()
  return data
}

const createAccount = async (userInfo) => {
  try {
    const user = userModel(userInfo)
    const data = await user.save()
    return {
      userId: data._id,
      username: data.username,
      role: data.role,
      activate: data.activate
    }
  } catch(error) {
    throw error
  }
}

const authenticate = async (username, pass) => {
  try{
    const user = await userModel.findOne({ $and: [{ username }, { password: pass }] })
    if (user.role !== CONSTANTS.USER_ROLE.ADMIN) {
      if (user.active === false) {
        throw 'Account is not activate!!!'
      }
    }
    if (!user) {
      throw 'User is not existed !!!'
    }
    const { password, ...userWithoutHass } = user.toObject() 
    const token = await tokenAuthen.generateToken(userWithoutHass)
    if (token) {
      const data = userWithoutHass
      data.token = token
      return data
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
    create,
    update,
    checkExist,
    getDetail,
    getList,
    createAccount,
    authenticate
}