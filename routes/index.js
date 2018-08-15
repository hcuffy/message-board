const express = require('express')
const router = express.Router()
const threadController = require('../controllers/threads')


router.get('/threads/', threadController.getThreads)
router.post('/thread/new/', threadController.addNewThread)
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Homepage' })
})

module.exports = router
