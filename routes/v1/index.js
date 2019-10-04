const Router = require('express')
const router = new Router()

const customer = require('./customer')
router.use('/customer', customer)
module.exports = router
