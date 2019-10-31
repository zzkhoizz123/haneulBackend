const ObjectId = require('bson').ObjectId
const RESPONSE = require('../middlewares/response')
const ERRORCODE = require('../constants/errorCode')
const CONSTANT = require('../constants/constant')

const categoryService = require('../services/category.service')
const subcategoryService = require('../services/subcategory.service')

const createCategory = async (req, res) => {
  try {
    if (req.role !== CONSTANT.USER_ROLE.ADMIN) {
      RESPONSE.message(res, ERRORCODE.DO_NOT_HAVE_PERMISSION)
    }
    const name = req.body.name
    const subList = req.body.subList

    const lst = []
    for (const item in subList) {
      const sub = await subcategoryService.create({ name: subList[item] })
      lst.push(sub._id)
    }
    await categoryService.create({ name: name, subList: lst })

    ERRORCODE.SUCCESSFUL.data = { name: name, subList }
    RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const getAllCategory = async (req, res) => {
  try {
    const categoryList = await categoryService.getAllCategory()

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
    const subcategoryName = req.body.subcategoryName
    const categoryId = req.body.categoryId

    const subcategory = await subcategoryService.create({ name: subcategoryName })
    const category = await categoryService.addSubToCategory(subcategory._id, categoryId)
    ERRORCODE.SUCCESSFUL.data = category
    RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const getCategory = async (req, res) => {
  try {
    const id = req.query.id
    const data = await categoryService.getDetail({ _id: new ObjectId(id) })

    ERRORCODE.SUCCESSFUL.data = data
    RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const updateCategory = async (req, res) => {
  try {
    if (req.role !== CONSTANT.USER_ROLE.ADMIN) {
      RESPONSE.message(res, ERRORCODE.DO_NOT_HAVE_PERMISSION)
    }
    const { categoryid, categoryName } = req.body
    const result = await categoryService.updateCategory(categoryid, categoryName)

    RESPONSE.message(res, result)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const removeCategory = async (req, res) => {
  try {
    if (req.role !== CONSTANT.USER_ROLE.ADMIN) {
      RESPONSE.message(res, ERRORCODE.DO_NOT_HAVE_PERMISSION)
    }
    const categoryid = req.body.categoryid
    const result = await categoryService.removeCategory(categoryid)

    RESPONSE.message(res, result)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

module.exports = {
  createCategory,
  getAllCategory,
  addSubToCategory,
  getCategory,
  removeCategory,
  updateCategory
}
