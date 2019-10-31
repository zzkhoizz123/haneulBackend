const Router = require('express')

const productController = require('../../controllers/product.controller')
const authenMiddleware = require('../../middlewares/authen.middleware')

const router = new Router()

router.route('/').post(authenMiddleware.verifyToken, productController.createProduct)

router.route('/addSubcategory').post(authenMiddleware.verifyToken, productController.addSubcategory)

router.route('/addTag').post(authenMiddleware.verifyToken, productController.addTag)

router.route('/addVarian').post(authenMiddleware.verifyToken, productController.addVarian)

router.route('/getProductByTime').get(productController.getProductByTime)

router.route('/getProductById').get(productController.getProductById)

router.route('/getProductBySubcategory').get(productController.getProductBySubcategory)

router.route('/getProductByTag').get(productController.getProductByTag)

router.route('/update').post(authenMiddleware.verifyToken, productController.updateProduct)

router.route('/remove').post(authenMiddleware.verifyToken, productController.removeProduct)

module.exports = router
