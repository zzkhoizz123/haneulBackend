const Router = require('express')

const orderController = require('../../controllers/order.controller')
const authenMiddleware = require('../../middlewares/authen.middleware')

const router = new Router()

router.route('/').post(authenMiddleware.verifyToken, orderController.createOrder)

router.route('/draftOrder').post(authenMiddleware.verifyToken, orderController.draftOrder)

router.route('/confirmOrder').post(authenMiddleware.verifyToken, orderController.confirmOrder)

router.route('/cancelledOrder').post(authenMiddleware.verifyToken, orderController.confirmOrder)

router.route('/getOrder').get(authenMiddleware.verifyToken, orderController.getOrder)

router.route('/getOrderList').get(authenMiddleware.verifyToken, orderController.getOrderList)
module.exports = router
