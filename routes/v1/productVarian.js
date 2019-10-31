const Router = require('express')

const productVarianController = require('../../controllers/productVarian.controller')
const authenMiddleware = require('../../middlewares/authen.middleware')

const router = new Router()

router.route('/').get(productVarianController.getProductVarian)
router.route('/update').get(authenMiddleware.verifyToken, productVarianController.updateProductVarian)
router.route('/remove').get(authenMiddleware.verifyToken, productVarianController.removeProductVarian)

module.exports = router
