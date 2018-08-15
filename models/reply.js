const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReplySchema = new Schema(
	{
		threadId: String,
		reply: String,
		password: String,
		report: Boolean,
		deleted: Boolean
	},
	{ timestamps: true }
)

const ModelClass = mongoose.model('reply', ReplySchema)
module.exports = ModelClass
