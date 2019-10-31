const Router = require('express')

const subcategoryController = require('../../controllers/subcategory.controller')
const authenMiddleware = require('../../middlewares/authen.middleware')

const router = new Router()

router.route('/').post(authenMiddleware.verifyToken, subcategoryController.createSubcategory)
router.route('/').get(subcategoryController.getSubcategory)
router.route('/getAll').get(subcategoryController.getAllSubcategory)
router.route('/getMany').post(subcategoryController.getManySubcategory)
router.route('/update').post(authenMiddleware.verifyToken, subcategoryController.updateSubcategory)
router.route('/remove').post(authenMiddleware.verifyToken, subcategoryController.removeSubcategory)

module.exports = router
