const ObjectId = require('bson').ObjectId
const RESPONSE = require('../middlewares/response')
const ERRORCODE = require('../constants/errorCode')
const CONSTANT = require('../constants/constant')

const subcategoryService = require('../services/subcategory.service')

const createSubcategory = async (req, res) => {
  try {
    if (req.role !== CONSTANT.USER_ROLE.ADMIN) {
      RESPONSE.message(res, ERRORCODE.DO_NOT_HAVE_PERMISSION)
    }
    const name = req.body.name
    await subcategoryService.create({ name: name })

    ERRORCODE.SUCCESSFUL.data = { name: name }
    RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const getSubcategory = async (req, res) => {
  try {
    const id = req.query.id
    data = await subcategoryService.getDetail({ _id: new ObjectId(id) })

    ERRORCODE.SUCCESSFUL.data = data
    RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const getAllSubcategory = async (req, res) => {
  try {
    const subcategoryList = await subcategoryService.getList({})

    ERRORCODE.SUCCESSFUL.data = subcategoryList
    RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const getManySubcategory = async (req, res) => {
  try {
    const subcategoryList = req.body.lst
    const data = []
    for (const item in subcategoryList) {
      const temp = await subcategoryService.getDetail({ _id: new ObjectId(subcategoryList[item]) })
      data.push(temp)
    }
    ERRORCODE.SUCCESSFUL.data = data
    RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const updateSubcategory = async (req, res) => {
  try {
    if (req.role !== CONSTANT.USER_ROLE.ADMIN) {
      RESPONSE.message(res, ERRORCODE.DO_NOT_HAVE_PERMISSION)
    }
    const { subcategoryid, subcategoryName } = req.body
    
    const result = await subcategoryService.updateSubcategory(subcategoryid, subcategoryName)

    RESPONSE.message(res, result)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const removeSubcategory = async (req, res) => {
  try {
    if (req.role !== CONSTANT.USER_ROLE.ADMIN) {
      RESPONSE.message(res, ERRORCODE.DO_NOT_HAVE_PERMISSION)
    }
    const { subcategoryid } = req.body
    
    const result = await subcategoryService.removeSubcategory(subcategoryid)

    RESPONSE.message(res, result)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}


module.exports = {
  createSubcategory,
  getAllSubcategory,
  getManySubcategory,
  getSubcategory,
  updateSubcategory,
  removeSubcategory
}
