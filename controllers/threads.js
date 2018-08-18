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
	res.redirect('/threads')
}

exports.getThreads = (req, res, next) => {
	Thread.find({},null,{ sort: { createdAt: -1 } }, (err , threads) => {
		if (err){
	  return next(err)
		}
		res.render('thread', { title: 'Thread List' , threads })
	})

}

exports.reportThread = (req, res, next) => {
	Thread.findByIdAndUpdate(req.params.id,{ $set :{ report : true } }, (err, thread) => {
		if (err) {
			return next(err)
		}
	   res.end('success')

	})

}

exports.deleteThread = (req, res, next) => {
	const { password } = req.body
	Thread.findById(req.params.id, (err, thread) => {
		if (err) {
			return next(err)
		}
		bcrypt.compare(password, thread.password, (err, answer) => {
			if (answer){
				Thread.findByIdAndRemove(req.params.id, (err, thread) => {
					if (err) {
						return next(err)
					}
					res.end('success')

				})
			} else {
				res.end('error')
			}
		})

	})

}
