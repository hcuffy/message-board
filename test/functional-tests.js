const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = require('chai').assert
const server = require('../testing-server')
const jsdom = require('jsdom')
const { JSDOM } = jsdom

chai.use(chaiHttp)

describe('functional tests', () =>  {
  	it('should get all threads', (done) =>  {
    	chai.request(server)
    		.get('/threads/')
    		.end((err, res) => {
    			console.log(res.text)
    			assert.equal(res.status, 200)
    			done()
    	})
	  })


})
