const Reply = require('../models/reply')
const Thread = require('../models/thread')
const bcrypt = require('bcrypt')
const saltRounds = 10

exports.addReply = (req, res, next) => {
	if (Object.keys(req.body).length === 0 && req.body.constructor === Object){
		res.end('Request was empty.')
		return
	}

	const {
		reply,
		password
	} = req.body

	const hashedPassword = bcrypt.hashSync(password, saltRounds)
	let id = req.params.id

	const newReply = new Reply({
		threadId: req.params.id,
		reply: reply,
		password: password,
		report: false,
		deleted: false
	})
	newReply.save(err => {
		if (err) {
			 return next(err)
		 }
	})
	res.redirect('/threads')
}

exports.displayAllReplies = (req, res, next) => {
	let repliesArray = []
	Thread.findById(req.params.id, (err , thread) => {
		if (err){
	  return next(err)
		}
		Reply.find({},null,{ sort: { createdAt: -1 } }, (err , replies) => {
			if (err){
				return next(err)
			}
			//console.log(replies)
			console.log(thread)
			repliesArray = replies.filter(replies => replies.threadId == req.params.id)

			res.render('single-thread', { title: 'Single Thread' , thread, repliesArray })
		})
	})

}
