/*
  Unit tests for the index.js main library
*/

// npm libraries
const assert = require('chai').assert
const sinon = require('sinon')
// const cloneDeep = require('lodash.clonedeep')

// Mocking data libraries.
// const mockDataLib = require('./mocks/util-mocks')

// Unit under test
const SlpTokenMedia = require('../../index.js')

describe('#index.js', () => {
  let sandbox
  let uut
  // let mockData

  beforeEach(() => {
    // Restore the sandbox before each test.
    sandbox = sinon.createSandbox()

    // Clone the mock data.
    // mockData = cloneDeep(mockDataLib)

    uut = new SlpTokenMedia()
  })

  afterEach(() => sandbox.restore())

  describe('#getIcon', () => {
    it('should throw an error if no token ID argument is passed', async () => {
      try {
        await uut.getIcon()

        assert.fail('Unexpected result')
      } catch (err) {
        assert.include(err.message, 'getIcon() requires a 64 character token ID as input.')
      }
    })
  })
})
