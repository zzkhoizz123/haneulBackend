const Router = require('express')

const categoryController = require('../../controllers/category.controller')
const authenMiddleware = require('../../middlewares/authen.middleware')

const router = new Router()

router.route('/').post(authenMiddleware.verifyToken, categoryController.createCategory)
router.route('/').get(categoryController.getCategory)
router.route('/getAll').get(categoryController.getAllCategory)
router.route('/addSubToCategory').post(authenMiddleware.verifyToken, categoryController.addSubToCategory)

module.exports = router
