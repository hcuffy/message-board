const Thread = require('../models/thread')
const bcrypt = require('bcrypt')
const saltRounds = 10

exports.addNewThread = (req, res, next) => {

	if (Object.keys(req.body).length === 0 && req.body.constructor === Object){
		res.end('Request was empty.')
		return
	}

	const {
		thread_text,
		password
	} = req.body

	const hashedPassword = bcrypt.hashSync(password, saltRounds)

	const newThread = new Thread({
		thread: thread_text,
		password: hashedPassword,
		report: false,
		deleted: false
	})
	newThread.save(err => {
		if (err) {
			 return next(err)
		 }
	})
	res.render('index', { title: 'Homepage' })

}

exports.getThreads = (req, res, next) => {

	Thread.find({}, (err , threads) => {
		if (err){
	  return next(err)
		}
		res.render('thread', { title: 'Thread List' , threads })

	})

}
