const Reply = require('../models/reply')
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
