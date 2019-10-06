const jwt = require('jsonwebtoken')
const ObjectId = require('bson').ObjectId;

const serverConfig = require('../config/server.config')
const RESPONSE = require('../middlewares/response')
const ERRORCODE = require('../constants/errorCode')
const CONSTANT = require('../constants/constant')

const userService = require('../services/user.service')

const signin = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      RESPONSE.message(res, ERRORCODE.MISSING_FIELD)
    }

    const result = await userService.authenticate(username, password)

    ERRORCODE.SUCCESSFUL.data = result
    RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const signup = async (req, res) => {
  try {
    const { username, password } = req.body
    if (!username || !password) {
      RESPONSE.message(res, ERRORCODE.MISSING_FIELD)
    }
    const userExisted = await userService.checkExist({ username: username })
    if (userExisted) {
      return RESPONSE.message(res, ERRORCODE.DATA_ALDREADY_EXISTED)
    }

    const customerInfo = {
      username, 
      password
    }

    const data = await userService.createAccount(customerInfo)

    ERRORCODE.SUCCESSFUL.data = data
    RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const editProfile = async (req, res) => {
  try {
    const username = req.body.username
    const address = req.body.address
    const phone = req.body.phone

    const id = req.id
    const update = {}
    if (username) {
      update.username = username
    }
    if (address) {
      update.address = address
    }
    if (phone) {
      update.phone = phone
    }
    const result = await userService.update({ _id: new ObjectId(id) }, update)
    if (result) {
      ERRORCODE.SUCCESSFUL.data = update
    }
    return RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  }catch (error) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const changePassword = async (req, res) => {
  try {
    const username = req.body.username
    const password = req.body.password
    const newPass = req.body.newPass
    
    const user = await userService.getDetail({ $and: [ { username }, { password }]})
    if (!user) {
      return RESPONSE.message(res, ERRORCODE.DATA_NOT_EXISTED)
    }

    await userService.update({ username: username }, {password: newPass})
    return RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  }catch (error) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const activateAccount = async (req, res) => {
  try {
    if (req.role !== CONSTANT.USER_ROLE.ADMIN) {
      RESPONSE.message(res, ERRORCODE.DO_NOT_HAVE_PERMISSION)
    }
    const userid = req.body.userid
    await userService.update({ _id: new ObjectId(userid) }, {activate: true})
    
    return RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  }catch (error) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const deactivateAccount = async (req, res) => {
  try {
    if (req.role !== CONSTANT.USER_ROLE.ADMIN) {
      RESPONSE.message(res, ERRORCODE.DO_NOT_HAVE_PERMISSION)
    }
    const userid = req.body.userid
    await userService.update({ _id: new ObjectId(userid) }, {activate: false})
    
    return RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  }catch (error) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const getListUser = async (req, res) => {
  try {
    if (req.role !== CONSTANT.USER_ROLE.ADMIN) {
      RESPONSE.message(res, ERRORCODE.DO_NOT_HAVE_PERMISSION)
    }
    const userList = await userService.getList({ role: CONSTANT.USER_ROLE.ADMIN },{ password: CONSTANT.DISAPPEARANCE })
    ERRORCODE.SUCCESSFUL.data = userList
    return RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  }catch (error) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

module.exports = {
  signin,
  signup,
  editProfile,
  changePassword,
  activateAccount,
  deactivateAccount,
  getListUser
}
