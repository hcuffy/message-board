const express = require('express')
const router = express.Router()
const replyController = require('../controllers/reply')

router.put('/report/:id', replyController.reportReply)
router.post('/add-reply/:id', replyController.addReply)
router.get('/all-replies/:id', replyController.displayAllReplies)

module.exports = router
