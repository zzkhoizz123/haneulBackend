const Router = require('express')

const productVarianController = require('../../controllers/productVarian.controller')
const authenMiddleware = require('../../middlewares/authen.middleware')

const router = new Router()

router.route('/').get(authenMiddleware.verifyToken, productVarianController.getProductVarian)

module.exports = router
