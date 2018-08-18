const express = require('express')
const router = express.Router()
const replyController = require('../controllers/reply')

router.post('/add-reply/:id', replyController.addReply)

module.exports = router
