const ObjectId = require('bson').ObjectId;
const RESPONSE = require('../middlewares/response')
const ERRORCODE = require('../constants/errorCode')
const CONSTANT = require('../constants/constant')

const tagService = require('../services/tag.service')

const createTag = async (req, res) => {
  try {
    if (req.role !== CONSTANT.USER_ROLE.ADMIN) {
        RESPONSE.message(res, ERRORCODE.DO_NOT_HAVE_PERMISSION)
    }
    const name = req.body.name
    await tagService.create({name: name})

    ERRORCODE.SUCCESSFUL.data = { name: name }
    RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const getTag = async (req, res) => {
    try {
      const id = req.query.id
      data = await tagService.getDetail({_id: new ObjectId(id)})
  
      ERRORCODE.SUCCESSFUL.data = data
      RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
    } catch (err) {
      console.log(err)
      RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
    }
  }

const getAllTag = async (req, res) => {
    try {
      const tagList = await tagService.getList({})
        
      ERRORCODE.SUCCESSFUL.data = tagList
      RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
    } catch (err) {
      console.log(err)
      RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
    }
}

const getManyTag = async (req, res) => {
    try {
        const tagList = req.body.lst
        let data = []
        for (let item in tagList) {
            const temp = await tagService.getDetail({_id: new ObjectId(tagList[item])})
            data.push(temp)
        }
        ERRORCODE.SUCCESSFUL.data = data
        RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
    } catch (err) {
        console.log(err)
        RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
    }
}

module.exports = {
    createTag,
    getAllTag,
    getManyTag,
    getTag
}
