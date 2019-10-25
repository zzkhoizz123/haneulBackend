'use strict'
const ObjectId = require('bson').ObjectId;

// Import tools
const  ERRORCODE = require('../constants/errorCode')
const CONSTANTS = require('../constants/constant')
const categoryModel = require('../models/category.model')
const subcategoryModel = require('../models/subcategory.model')

const create = async (cropInfo) => {
  const data = await categoryModel.create(cropInfo)
  return data
}

const update = async (query, newInfo) => {
  const data = await categoryModel.findOneAndUpdate(query, { $set: newInfo }, { newc: true })
  return
}

const checkExist = async (query) => {
  const data = await categoryModel.findOne(query, { _id: CONSTANTS.APPEARANCE }).lean()
  return !!data
}

const getDetail = async (query, projection = {}) => {
  const data = await categoryModel.findOne(query, projection).lean()
  return data
}

const getList = async (query, projection, sort = { createAt: CONSTANTS.APPEARANCE }, offset = 0, limit = CONSTANTS.LIMIT_QUERY) => {
  const data = await categoryModel.find(query, projection).sort(sort).skip(offset).limit(limit).lean()
  return data
}

const addSubToCategory = async (subcategoryId, categoryId) => {
    const data = await categoryModel.findByIdAndUpdate(
        {_id: new ObjectId(categoryId)},
        { $push: {subList: subcategoryId} },
    )
}
const getAllCategory = async () => {
  const cateLst = await categoryModel.find({})
  const lst = []
  console.log(cateLst)
  for (let item in cateLst) {
    let obj = {
      id: cateLst[item]._id,
      name: cateLst[item].name,
      subList: []
    }
    for (let item2 in cateLst[item].subList) {
      const sub = await subcategoryModel.findById(new ObjectId(cateLst[item].subList[item2]))
      obj.subList.push(sub)
    }
    lst.push(obj)
  }
  return lst
}

module.exports = {
    create,
    update,
    checkExist,
    getDetail,
    getList,
    addSubToCategory,
    getAllCategory
}