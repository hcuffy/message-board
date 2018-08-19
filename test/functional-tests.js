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
		// 			console.log(res.text)
		// 			assert.equal(res.status, 200)
		// 			done()
		// 		})
		// })

		// it('should add new thread', (done) =>  {
		// 	let threadText = 'Should add thread!'
		// 	chai.request(server)
		// 		.post('/thread/new/')
		// 		.set('content-type', 'application/x-www-form-urlencoded')
		// 		.send({ thread_text : threadText , password : '123qwe' })
		// 		.end((err, res) => {
		//
		// 			const dom = new JSDOM(res.text)
		// 			let output = dom.window.document.body.querySelector('.all-threads').textContent
		// 			assert.equal(res.status, 200)
		// 			assert.include(output, threadText , 'Output contains thread text.')
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

		// it('should not delete thread with wrong password', (done)  =>  {
		// 	let id = '5b798e78f7760d4d1b767eb3' //should be updated before testing
		// 	chai.request(server)
		// 		.delete('/thread/' + id)
		// 		.send({ password : 'qwe123' })
		// 		.end((err, res) => {
		// 			assert.equal(res.status, 400)
		// 			assert.equal(res.text, '{"error":"Could not delete the thread."}')
		// 			done()
		// 		})
		// })
		//
		// it('should not find thread with wrong id', (done)  =>  {
		// 	let id = '5b798e78f7755d4d1b767eb4'
		// 	chai.request(server)
		// 		.delete('/thread/' + id)
		// 		.send({ password : '123qwe' })
		// 		.end((err, res) => {
		// 			assert.equal(res.status, 400)
		// 			assert.equal(res.text, '{"error":"Could not find thread."}')
		// 			done()
		// 		})
		// })
		//
		// it('should delete thread', (done)  =>  {
		// 	let id = '5b798e78f7760d4d1b767eb3'
		// 	chai.request(server)
		// 		.delete('/thread/' + id)
		// 		.send({ password : '123qwe' })
		// 		.end((err, res) => {
		// 			assert.equal(res.status, 200)
		// 			assert.equal(res.text, 'success')
		// 			done()
		// 		})
		// })
	})

	describe('Reply test suite', () =>  {
		// it('should get all replies for a thread', (done) =>  {
		// 	let id = '5b79aa14db062e505b92b45d'
		// 	chai.request(server)
		// 		.get('/replies/all-replies/' + id)
		// 		.end((err, res) => {
		// 			const dom = new JSDOM(res.text)
		//   		let output = dom.window.document.body.querySelector('.reply-paragraph').textContent
		// 			assert.equal(res.status, 200)
		// 		  assert.isAbove(output.length, 16 , 'Output contains at least one reply.')
		// 			done()
		// 		})
		// })

		it('should add new reply', (done) =>  {
			let threadId = '5b79aa14db062e505b92b45d'
			let replyText = 'Should add a reply!'
			chai.request(server)
				.post('/replies/add-reply/' + threadId)
				.set('content-type', 'application/x-www-form-urlencoded')
				.send({ reply : replyText , password : '123qwe' })
				.end((err, res) => {

					const dom = new JSDOM(res.text)
					let output = dom.window.document.body.querySelector('.reply-box').textContent
					console.log(output)
					assert.equal(res.status, 200)
				  assert.include(output, replyText , 'Output contains thread text.')
					done()
				})
		})



	})
})
