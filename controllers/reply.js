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

	const newReply = new Reply({
		threadId: req.params.id,
		reply: reply,
		password: hashedPassword,
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
			repliesArray = replies.filter(replies => replies.threadId == req.params.id)

			res.render('single-thread', { title: 'Single Thread' , thread, repliesArray })
		})
	})

}

exports.reportReply = (req, res, next) => {

	Reply.findByIdAndUpdate(req.params.id,{ $set :{ report : true } }, (err, reply) => {
		if (err) {
			return next(err)
		}
	   res.end('success')

	})

}


exports.deleteReply = (req, res, next) => {
	const { password } = req.body
	Reply.findById(req.params.id, (err, reply) => {
		if (err) {
			return next(err)
		}
		if (reply == null){
			res.status(400).send({
				error: 'Could not find reply.'
			})
			return
		}
		bcrypt.compare(password, reply.password, (err, answer) => {
			if (answer){
				Reply.findByIdAndUpdate(req.params.id,{ $set :{ deleted : true } }, (err, reply) => {
					if (err) {
						return next(err)
					}
					res.end('success')

				})
			} else {
				res.status(400).send({
	       error: 'Could not delete the reply.'
				})
			}
		})

	})

}


exports.addReplySingle = (req, res, next) => {
	if (Object.keys(req.body).length === 0 && req.body.constructor === Object){
		res.end('Request was empty.')
		return
	}
	console.log('I am here')
	const {
		reply,
		password
	} = req.body

	const hashedPassword = bcrypt.hashSync(password, saltRounds)

	const newReply = new Reply({
		threadId: req.params.id,
		reply: reply,
		password: hashedPassword,
		report: false,
		deleted: false
	})
	newReply.save(err => {
		if (err) {
			 return next(err)
		 }
	})
	res.redirect('/replies/all-replies/' + req.params.id)
}
