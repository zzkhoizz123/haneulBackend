const Router = require('express')

const tagController = require('../../controllers/tag.controller')
const authenMiddleware = require('../../middlewares/authen.middleware')

const router = new Router()

router.route('/').post(authenMiddleware.verifyToken, tagController.createTag)
router.route('/').get(tagController.getTag)
router.route('/getAll').get(tagController.getAllTag)
router.route('/getMany').post(tagController.getManyTag)

module.exports = router
