const Router = require('express')
const router = new Router()

const user = require('./user')
const subcategory = require('./subcategory')
const category = require('./category')
const product = require('./product')
const tag = require('./tag')

router.use('/user', user)
router.use('/subcategory', subcategory)
router.use('/category', category)
router.use('/product', product)
router.use('/tag', tag)

module.exports = router
