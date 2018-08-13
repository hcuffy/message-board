const Thread = require('../models/thread')

exports.addNewThread = (req, res, next) => {

	if (Object.keys(req.body).length === 0 && req.body.constructor === Object){
		res.end('Request was empty.')
		return
	}

	const {
		thread_text,
		password
	} = req.body

	const newThread = new Thread({
		thread: thread_text,
		password: password,
		report: false,
		replies: [],
		deleted: false
	})
	newThread.save(err => {
		if (err) {
			 return next(err)
		 }
	})
	res.render('index', { title: 'Homepage' })

}
