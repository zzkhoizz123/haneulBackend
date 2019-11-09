const ObjectId = require('bson').ObjectId
const RESPONSE = require('../middlewares/response')
const ERRORCODE = require('../constants/errorCode')
const CONSTANT = require('../constants/constant')

const productService = require('../services/product.service')
const productVarianService = require('../services/productVarian.service')
const uploadCloudinary = require('../util/cloudiany.util')

const createProduct = async (req, res) => {
  try {
    if (req.role !== CONSTANT.USER_ROLE.ADMIN) {
      return RESPONSE.message(res, ERRORCODE.DO_NOT_HAVE_PERMISSION)
    }
    const varianInfo = req.body.varian // list varian
    const images = req.body.images // list images
    const varianList = []

    for (const item in varianInfo) {
      const varianTemp = {
        color: varianInfo[item].color,
        size: varianInfo[item].size,
        stock: varianInfo[item].stock,
        price: varianInfo[item].price
      }
      const varian = await productVarianService.create(varianTemp)
      varianList.push(varian._id)
    }

    
    // let exec = []
    // for (const item in images) {
    //   const result = await uploadCloudinary.decompressLZUTF8AndUploadStreamImage(product._id, images[item])
    //   exec.push(result)
    // }
    // await productService.update({ _id: product._id }, { imageURL: exec })

    const productTemp = {
      name: req.body.name,
      description: req.body.description,
      subcategoryID: req.body.subcategory,
      tagID: req.body.tag,
      productVarianID: varianList,
    }
    const product = await productService.create(productTemp)

    for (const item in varianList) {
      await productVarianService.update(
        { _id: new ObjectId(varianList[item]) },
        { $set: { productID: product._id } }
      )
    }

    let exec = []
    for (const item in images) {
      const result = await uploadCloudinary.decompressLZUTF8AndUploadStreamImage(product._id, images[item])
      exec.push(result)
    }
    await productService.update({ _id: product._id }, { imageURL: exec })
    ERRORCODE.SUCCESSFUL.data = product
    return RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    return RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const addSubcategory = async (req, res) => {
  try {
    if (req.role !== CONSTANT.USER_ROLE.ADMIN) {
      return RESPONSE.message(res, ERRORCODE.DO_NOT_HAVE_PERMISSION)
    }
    const productId = req.body.productId
    const subId = req.body.subId

    const isExisted = await productService.checkExist({ subcategoryID: subId })
    if (isExisted) {
      return RESPONSE.message(res, ERRORCODE.DATA_ALDREADY_EXISTED)
    }

    await productService.update(
      { _id: new ObjectId(productId) },
      { $push: { subcategoryID: subId } }
    )

    return RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    return RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const addTag = async (req, res) => {
  try {
    if (req.role !== CONSTANT.USER_ROLE.ADMIN) {
      return RESPONSE.message(res, ERRORCODE.DO_NOT_HAVE_PERMISSION)
    }
    const productId = req.body.productId
    const tagId = req.body.tagId

    const isExisted = await productService.checkExist({ tagID: ObjectId(tagId) })
    if (isExisted) {
      return RESPONSE.message(res, ERRORCODE.DATA_ALDREADY_EXISTED)
    }

    await productService.update(
      { _id: new ObjectId(productId) },
      { $push: { tagID: new ObjectId(tagId) } }
    )

    return RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    return RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const addVarian = async (req, res) => {
  try {
    if (req.role !== CONSTANT.USER_ROLE.ADMIN) {
      return RESPONSE.message(res, ERRORCODE.DO_NOT_HAVE_PERMISSION)
    }
    const productId = req.body.productId
    const varianInfo = req.body.varianInfo

    const varian = await productVarianService.create({
      color: varianInfo.color,
      size: varianInfo.size,
      stock: varianInfo.stock,
      price: varianInfo.price
    })

    await productService.update(
      { _id: new ObjectId(productId) },
      { $push: { productVarianID: varian._id } }
    )

    return RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    return RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const getProductByTime = async (req, res) => {
  try {
    const result = await productService.getProductByTime({})

    RESPONSE.message(res, result)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const getProductById = async (req, res) => {
  try {
    const id = req.query.id
    console.log(id)
    const result = await productService.getProductById(id)
    RESPONSE.message(res, result)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const getProductBySubcategory = async (req, res) => {
  try {
    const subcategoryID = req.query.subcategoryID
    const result = await productService.getProductBySubcategory(subcategoryID)
    RESPONSE.message(res, result)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const getProductByTag = async (req, res) => {
  try {
    const tagID = req.query.tagID
    const result = await productService.getProductByTag(tagID)
    RESPONSE.message(res, result)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}

const updateProduct = async (req, res) => {
  try {
    if (req.role !== CONSTANT.USER_ROLE.ADMIN) {
      return RESPONSE.message(res, ERRORCODE.DO_NOT_HAVE_PERMISSION)
    }
    const { name, description, picture, productId} = req.body
    let update = {}
    if (name) update.name = name
    if (description) update.description = description
    if (picture) update.picture = picture

    await productService.update({ _id: new ObjectId(productId) }, { $set: update })
    RESPONSE.message(res, ERRORCODE.SUCCESSFUL)
  } catch (err) {
    console.log(err)
    RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}


const removeProduct = async (req, res) => {
  try {
    if (req.role !== CONSTANT.USER_ROLE.ADMIN) {
      return RESPONSE.message(res, ERRORCODE.DO_NOT_HAVE_PERMISSION)
    }
    const { productId } = req.body
    if (!productId) {
      return RESPONSE.message(res, ERRORCODE.MISSING_FIELD)
    }

    const result = await productService.removeProduct(productId)
    return RESPONSE.message(res, result)
  } catch (err) {
    console.log(err)
    return RESPONSE.message(res, ERRORCODE.ERROR_SERVER)
  }
}
module.exports = {
  createProduct,
  getProductByTime,
  getProductById,
  getProductBySubcategory,
  getProductByTag,
  addSubcategory,
  addTag,
  addVarian,
  updateProduct,
  removeProduct
}
