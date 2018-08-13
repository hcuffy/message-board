const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ThreadSchema = new Schema(
	{
		thread: String,
		password: String,
		report: Boolean,
		replies: [],
		deleted: Boolean
	},
	{ timestamps: true }
)

const ModelClass = mongoose.model('thread', ThreadSchema)
module.exports = ModelClass
