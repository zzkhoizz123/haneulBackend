const Router = require('express')

const userController = require('../../controllers/user.controller')
const authenMiddleware = require('../../middlewares/authen.middleware')

const router = new Router()

router.route('/signin').post(userController.signin)
router.route('/signup').post(userController.signup)
router.route('/editProfile').post(authenMiddleware.verifyToken, userController.editProfile)
router.route('/changePass').post(authenMiddleware.verifyToken, userController.changePassword)
router.route('/activateAccount').post(authenMiddleware.verifyToken, userController.activateAccount)
router.route('/deactivateAccount').post(authenMiddleware.verifyToken, userController.deactivateAccount)
router.route('/getListUser').get(authenMiddleware.verifyToken, userController.getListUser)

module.exports = router
