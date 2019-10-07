const ObjectId = require('bson').ObjectId;
const RESPONSE = require('../middlewares/response')
const ERRORCODE = require('../constants/errorCode')
const CONSTANT = require('../constants/constant')

const categoryService = require('../services/category.service')

const createCategory = async (req, res) => {
  try {
    if (req.role !== CONSTANT.USER_ROLE.ADMIN) {
        RESPONSE.message(res, ERRORCODE.DO_NOT_HAVE_PERMISSION)
    }
    const name = req.body.name
    const subList = req.body.subList
    
    await categoryService.create({ name: name, subList: subList })

    ERRORCODE.SUCCESSFUL.data = { name: name, subList }
    RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const getAllCategory = async (req, res) => {
    try {
      const categoryList = await categoryService.getList({})
        
      ERRORCODE.SUCCESSFUL.data = categoryList
      RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
    } catch (err) {
      console.log(err)
      RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
    }
}

const addSubToCategory = async (req, res) => {
    try {
        if (req.role !== CONSTANT.USER_ROLE.ADMIN) {
          RESPONSE.message(res, ERRORCODE.DO_NOT_HAVE_PERMISSION)
        }
        const subcategoryId = req.body.subcategoryId
        const categoryId = req.body.categoryId
        const category = await categoryService.addSubToCategory(subcategoryId, categoryId)
        RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
    } catch (err) {
        console.log(err)
        RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
    }
}

const getCategory = async (req, res) => {
    try {
      const id = req.query.id
      data = await categoryService.getDetail({_id: new ObjectId(id)})
  
      ERRORCODE.SUCCESSFUL.data = data
      RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
    } catch (err) {
      console.log(err)
      RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
    }
}
module.exports = {
    createCategory,
    getAllCategory,
    addSubToCategory,
    getCategory
}
