/*
  Unit tests for the index.js main library
*/

// npm libraries
const assert = require('chai').assert
const sinon = require('sinon')
const SlpWallet = require('minimal-slp-wallet/index.js')
const cloneDeep = require('lodash.clonedeep')

// Mocking data libraries.
const mockDataLib = require('./mocks/index-mocks')

// Unit under test
const SlpTokenMedia = require('../../index.js')

describe('#index.js', () => {
  let sandbox
  let uut
  let mockData

  beforeEach(async () => {
    // Restore the sandbox before each test.
    sandbox = sinon.createSandbox()

    // Clone the mock data.
    mockData = cloneDeep(mockDataLib)

    const wallet = new SlpWallet()
    await wallet.walletInfoPromise

    uut = new SlpTokenMedia({ wallet })
  })

  afterEach(() => sandbox.restore())

  describe('#constructor', () => {
    it('should throw an error if instance of minimal-slp-wallet is not passed', () => {
      try {
        uut = new SlpTokenMedia()

        assert.fail('Unexpected code path')
      } catch (err) {
        assert.include(err.message, 'Instance of minimal-slp-wallet must be passed as wallet when instantiating this library.')
      }
    })
  })

  describe('#getIcon', () => {
    it('should throw an error if no token ID argument is passed', async () => {
      try {
        await uut.getIcon()

        assert.fail('Unexpected result')
      } catch (err) {
        assert.include(err.message, 'getIcon() requires a 64 character token ID as input.')
      }
    })

    it('should return token data', async () => {
      // Mock dependencies and force desired code path.
      sandbox.stub(uut.slpMutableData.get, 'data').resolves(mockData.tokenData01)

      const tokenId = '293f388e3d8d7acb6ad8f0be135ade5ec4f97635cce5484d0326ef558a99e378'

      const result = await uut.getIcon({ tokenId })
      // console.log('result: ', result)

      // Assert that the returned object has expected properties.
      assert.property(result, 'tokenStats')
      assert.property(result, 'mutableData')
      assert.property(result, 'immutableData')
      assert.property(result, 'tokenIcon')
      assert.property(result, 'fullSizedUrl')
    })

    it('should return data from the cache if the data exists', async () => {
      // Mock dependencies and force desired code path.
      sandbox.stub(uut.slpMutableData.get, 'data').resolves(mockData.tokenData01)

      const tokenId = '293f388e3d8d7acb6ad8f0be135ade5ec4f97635cce5484d0326ef558a99e378'

      let result = await uut.getIcon({ tokenId })

      // Call it a second time to exercise the cache.
      result = await uut.getIcon({ tokenId })

      assert.equal(uut.state.tokenIdsCache.includes(tokenId), true)

      // Assert that the returned object has expected properties.
      assert.property(result, 'tokenStats')
      assert.property(result, 'mutableData')
      assert.property(result, 'immutableData')
      assert.property(result, 'tokenIcon')
      assert.property(result, 'fullSizedUrl')
    })
  })
})
