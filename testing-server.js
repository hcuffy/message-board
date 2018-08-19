const path = require('path')
const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const mongoose = require('mongoose')
const app = express()

mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://localhost:27017/personal-library',
	{ useNewUrlParser: true }
)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json('*/*'))

app.use('/', routes)
const port = process.env.PORT || 3030
app.listen(port, () => {
	console.log('Express server running on port', port)
})

module.exports = app
