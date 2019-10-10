const Router = require('express')

const commentController = require('../../controllers/comment.controller')
const authenMiddleware = require('../../middlewares/authen.middleware')

const router = new Router()

router.route('/').post(authenMiddleware.verifyToken, commentController.createComment)
router.route('/getCommentOfProduct').post(authenMiddleware.verifyToken, commentController.getCommentOfProduct)

module.exports = router
