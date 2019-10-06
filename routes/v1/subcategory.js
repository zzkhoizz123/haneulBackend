const Router = require('express')

const subcategoryController = require('../../controllers/subcategory.controller')
const authenMiddleware = require('../../middlewares/authen.middleware')

const router = new Router()

router.route('/').post(authenMiddleware.verifyToken, subcategoryController.createSubcategory)
router.route('/').get(authenMiddleware.verifyToken, subcategoryController.getSubcategory)
router.route('/getAll').get(authenMiddleware.verifyToken, subcategoryController.getAllSubcategory)
router.route('/getMany').post(authenMiddleware.verifyToken, subcategoryController.getManySubcategory)

module.exports = router
