var express = require('express')
var router = express.Router()


router.get('/test', function(req, res, next) {
	res.render('index', { title: 'Testing' })
})
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Homepage' })
})

module.exports = router
