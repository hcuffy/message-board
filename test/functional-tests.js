const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = require('chai').assert
const server = require('../testing-server')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

chai.use(chaiHttp)

describe('functional tests', () =>  {
	describe('Thread test suite', () =>  {
  	// it('should get all threads', (done) =>  {
		// 	chai.request(server)
		// 		.get('/threads/')
		// 		.end((err, res) => {
		// 			assert.equal(res.status, 200)
		// 			done()
		// 	})
	  // })

		// it('should add new thread', (done) =>  {
		// 	let threadText = 'Should add thread!'
		// 	chai.request(server)
		// 		.post('/thread/new/')
		// 		.set('content-type', 'application/x-www-form-urlencoded')
		// 		.send({ thread_text : threadText , password : '123qwe' })
		// 		.end((err, res) => {
		// 			const dom = new JSDOM(res.text)
		// 			let output = dom.window.document.body.querySelector('.all-threads').textContent
		// 			assert.equal(res.status, 200)
		// 			assert.include(output, threadText , 'Out contains thread text.')
		// 			done()
		// 		})
		// })

		// it('should report thread', (done) =>  {
		// 	let id = '5b74044cb042a91c7cd1a447'
		// 	chai.request(server)
		// 		.put('/thread/' + id)
		// 		.end((err, res) => {
		// 			assert.equal(res.status, 200)
		// 			assert.equal(res.text, 'success')
		// 			done()
		// 		})
		// })

		it('should delete thread', (done)  =>  {
			let id = '5b711b695cd3880b22ad57dc' //should be changed before testing
			chai.request(server)
				.delete('/thread/' + id)
    		.send({ password : '123qwe' })
				.end((err, res) => {
					// const dom = new JSDOM(res.text)
					// let output = dom.window.document.body.querySelector('pre').textContent
					console.log(res.text)
					assert.equal(res.status, 200)
					done()
				})
		})

	})
})
