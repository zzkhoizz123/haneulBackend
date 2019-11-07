const Router = require('express')
const router = new Router()

const user = require('./user')
const subcategory = require('./subcategory')
const category = require('./category')
const product = require('./product')
const tag = require('./tag')
const order = require('./order')
const productVarian = require('./productVarian')
const comment = require('./comment')

router.use('/user', user)
router.use('/subcategory', subcategory)
router.use('/category', category)
router.use('/product', product)
router.use('/tag', tag)
router.use('/order', order)
router.use('/productVarian', productVarian)
router.use('/comment', comment)

module.exports = router
