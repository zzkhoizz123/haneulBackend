const Router = require('express')
const router = new Router()

const user = require('./user')
const subcategory = require('./subcategory')
const category = require('./category')

router.use('/user', user)
router.use('/subcategory', subcategory)
router.use('/category', category)

module.exports = router
