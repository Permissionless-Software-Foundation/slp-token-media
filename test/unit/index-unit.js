/*
  Unit tests for the index.js main library
*/

// npm libraries
const assert = require('chai').assert
const sinon = require('sinon')
const SlpWallet = require('minimal-slp-wallet')
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

    const wallet = new SlpWallet(undefined, { interface: 'consumer-api' })
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

    it('should override default IPFS gateway', async () => {
      const wallet = new SlpWallet(undefined, { interface: 'consumer-api' })
      await wallet.walletInfoPromise

      const options = {
        wallet,
        cidUrlType: 2,
        ipfsGatewayUrl: 'test.com'
      }

      // Mock external dependencies.
      uut = new SlpTokenMedia(options)

      assert.equal(uut.cidUrlType, 2)
      assert.equal(uut.ipfsGatewayUrl, 'test.com')
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
      assert.property(result, 'optimizedTokenIcon')
      assert.property(result, 'optimizedFullSizedUrl')
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
      assert.property(result, 'optimizedTokenIcon')
      assert.property(result, 'optimizedFullSizedUrl')
    })

    it('should return token data for a token without mutable data', async () => {
      // Mock dependencies and force desired code path.
      sandbox.stub(uut.slpMutableData.get, 'data').resolves(mockData.tokenData02)

      const tokenId = '9fc89d6b7d5be2eac0b3787c5b8236bca5de641b5bafafc8f450727b63615c11'

      const result = await uut.getIcon({ tokenId })
      console.log('result: ', result)

      // Assert that the returned object has expected properties.
      assert.property(result, 'tokenStats')
      assert.property(result, 'tokenIcon')
      assert.property(result, 'optimizedTokenIcon')
    })
  })

  describe('#optimizeUrl', () => {
    it('should throw an error if entry is empty', () => {
      try {
        uut.optimizeUrl()

        assert.fail('Unexpected code path')
      } catch (err) {
        assert.include(err.message, 'optimizeUrl() expects a string or object as input.')
      }
    })

    it('should throw an error if entry is neither a string or an object', () => {
      try {
        uut.optimizeUrl(123)

        assert.fail('Unexpected code path')
      } catch (err) {
        assert.include(err.message, 'entry is neither a string nor an object')
      }
    })

    it('should generate a cidUrlType 1 optimized url from a url with a v1 CID', () => {
      // Takes a URL with a v1 CID, and returns a Type 1 URL using the preferred gateway.

      const entry = 'https://bafybeia5f5sf2avwmegmuy4w4oljcfbt3pj7thrucsg26n3gb65fyteiqq.ipfs.w3s.link/sailboat-in-fog.jpg'

      const result = uut.optimizeUrl(entry)
      console.log('result: ', result)

      assert.include(result, '.fullstack.cash/ipfs/bafybeia5f5sf2avwmegmuy4w4oljcfbt3pj7thrucsg26n3gb65fyteiqq/sailboat-in-fog.jpg')
    })

    it('should generate a cidUrlType 1 optimized url from a url with a v0 CID', () => {
      // Takes a URL with a v0 CID, and returns a Type 1 URL using the preferred gateway.

      const entry = 'https://cloudflare-ipfs.com/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/'

      const result = uut.optimizeUrl(entry)
      // console.log('result: ', result)

      assert.include(result, '.fullstack.cash/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/')
    })

    it('should generate a cidUrlType 2 optimized url from a url with a v1 CID', () => {
      // Take a URL with a v1 CID, and returns a Type 2 URL using the preferred gateway.

      const entry = 'https://bafybeia5f5sf2avwmegmuy4w4oljcfbt3pj7thrucsg26n3gb65fyteiqq.ipfs.w3s.link/sailboat-in-fog.jpg'

      // Force desired code path
      uut.cidUrlType = 2
      uut.ipfsGatewayUrl = 'ipfs.dweb.link'

      const result = uut.optimizeUrl(entry)
      // console.log('result: ', result)

      assert.equal(result, 'https://bafybeia5f5sf2avwmegmuy4w4oljcfbt3pj7thrucsg26n3gb65fyteiqq.ipfs.dweb.link/sailboat-in-fog.jpg')
    })

    it('should return original URL when configured for cidUrlType 2 and given a url with a v0 CID', () => {
      // v0 CIDs are not compatible with a Type 2 URL. In this case, return the original URL.

      const entry = 'https://cloudflare-ipfs.com/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/'

      // Force desired code path
      uut.cidUrlType = 2
      uut.ipfsGatewayUrl = 'ipfs.dweb.link'

      const result = uut.optimizeUrl(entry)
      // console.log('result: ', result)

      assert.equal(result, entry)
    })

    it('should generate a cidUrlType 1 optimized url from an entry object with an ipfs property and v1 CID', () => {
      // Takes an object with a v1 CID, and returns a Type 1 URL using the preferred gateway.

      const entry = {
        default: 'https://bafybeia5f5sf2avwmegmuy4w4oljcfbt3pj7thrucsg26n3gb65fyteiqq.ipfs.w3s.link/sailboat-in-fog.jpg',
        ipfs: {
          cid: 'bafybeia5f5sf2avwmegmuy4w4oljcfbt3pj7thrucsg26n3gb65fyteiqq',
          path: '/sailboat-in-fog.jpg'
        }
      }

      const result = uut.optimizeUrl(entry)
      // console.log('result: ', result)

      assert.include(result, '.fullstack.cash/ipfs/bafybeia5f5sf2avwmegmuy4w4oljcfbt3pj7thrucsg26n3gb65fyteiqq/sailboat-in-fog.jpg')
    })

    it('should generate a cidUrlType 1 optimized url from an entry object with an ipfs property and v0 CID', () => {
      // Takes an object with a v0 CID, and returns a Type 1 URL using the preferred gateway.

      const entry = {
        default: 'https://cloudflare-ipfs.com/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/',
        ipfs: {
          cid: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
          path: '/wiki/'
        }
      }

      const result = uut.optimizeUrl(entry)
      // console.log('result: ', result)

      assert.include(result, '.fullstack.cash/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/')
    })

    it('should generate a cidUrlType 2 optimized url from an entry object with an ipfs property and a v1 CID', () => {
      // Takes an object with a v1 CID, and returns a Type 2 URL using the preferred gateway.

      const entry = {
        default: 'https://bafybeia5f5sf2avwmegmuy4w4oljcfbt3pj7thrucsg26n3gb65fyteiqq.ipfs.w3s.link/sailboat-in-fog.jpg',
        ipfs: {
          cid: 'bafybeia5f5sf2avwmegmuy4w4oljcfbt3pj7thrucsg26n3gb65fyteiqq',
          path: '/sailboat-in-fog.jpg'
        }
      }

      // Force desired code path
      uut.cidUrlType = 2
      uut.ipfsGatewayUrl = 'ipfs.dweb.link'

      const result = uut.optimizeUrl(entry)
      // console.log('result: ', result)

      assert.equal(result, 'https://bafybeia5f5sf2avwmegmuy4w4oljcfbt3pj7thrucsg26n3gb65fyteiqq.ipfs.dweb.link/sailboat-in-fog.jpg')
    })

    it('should return default URL when configured for cidUrlType 2 and given a v0 CID', () => {
      // v0 CIDs are not compatible with a Type 2 URL. In this case, return the original URL.

      const entry = {
        default: 'https://cloudflare-ipfs.com/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/',
        ipfs: {
          cid: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
          path: '/wiki/'
        }
      }

      // Force desired code path
      uut.cidUrlType = 2
      uut.ipfsGatewayUrl = 'ipfs.dweb.link'

      const result = uut.optimizeUrl(entry)
      // console.log('result: ', result)

      assert.equal(result, entry.default)
    })

    it('should generate a cidUrlType 1 optimized url from an entry object with only a default URL', () => {
      // Takes an object with a v1 CID, and returns a Type 1 URL using the preferred gateway.

      const entry = {
        default: 'https://bafybeia5f5sf2avwmegmuy4w4oljcfbt3pj7thrucsg26n3gb65fyteiqq.ipfs.w3s.link/sailboat-in-fog.jpg'
      }

      const result = uut.optimizeUrl(entry)
      console.log('result: ', result)

      assert.include(result, '.fullstack.cash/ipfs/bafybeia5f5sf2avwmegmuy4w4oljcfbt3pj7thrucsg26n3gb65fyteiqq/sailboat-in-fog.jpg')
    })

    it('should generate a cidUrlType 1 optimized url from an entry object with only a default URL', () => {
      // Takes an object with a v0 CID, and returns a Type 1 URL using the preferred gateway.

      const entry = {
        default: 'https://cloudflare-ipfs.com/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/'
      }

      const result = uut.optimizeUrl(entry)
      // console.log('result: ', result)

      assert.include(result, '.fullstack.cash/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/')
    })

    it('should handle ipfs objects with a prefix', () => {
      // Takes an object with a v1 CID, and returns a Type 2 URL using the preferred gateway.

      const entry = {
        default: 'https://bafybeia5f5sf2avwmegmuy4w4oljcfbt3pj7thrucsg26n3gb65fyteiqq.ipfs.w3s.link/sailboat-in-fog.jpg',
        ipfs: {
          cid: 'ipfs://bafybeia5f5sf2avwmegmuy4w4oljcfbt3pj7thrucsg26n3gb65fyteiqq',
          path: '/sailboat-in-fog.jpg'
        }
      }

      // Force desired code path
      uut.cidUrlType = 2
      uut.ipfsGatewayUrl = 'ipfs.dweb.link'

      const result = uut.optimizeUrl(entry)
      // console.log('result: ', result)

      assert.equal(result, 'https://bafybeia5f5sf2avwmegmuy4w4oljcfbt3pj7thrucsg26n3gb65fyteiqq.ipfs.dweb.link/sailboat-in-fog.jpg')
    })

    it('should throw an error if object has no default property', () => {
      try {
        const entry = {
          ipfs: {
            cid: 'ipfs://bafybeia5f5sf2avwmegmuy4w4oljcfbt3pj7thrucsg26n3gb65fyteiqq',
            path: '/sailboat-in-fog.jpg'
          }
        }

        uut.optimizeUrl(entry)

        assert.fail('Unexpected code path')
      } catch (err) {
        assert.include(err.message, 'Media does not follow PS007. Media is an object, but has no default property.')
      }
    })
  })

  describe('#urlIsValid', () => {
    it('should validate a URL without downloading the file', async () => {
      // Mock dependencies and force desired code path
      sandbox.stub(uut.axios.default, 'head').resolves({ status: 200 })

      const url = 'https://tokens.bch.sx/100/9fc89d6b7d5be2eac0b3787c5b8236bca5de641b5bafafc8f450727b63615c11.png'

      const result = await uut.urlIsValid(url)
      // console.log('result: ', result)

      assert.equal(result, true)
    })

    it('should return false for invalid URL', async () => {
      // Mock dependencies and force desired code path
      const err = new Error('axios failed')
      err.response = {
        status: 404
      }
      sandbox.stub(uut.axios.default, 'head').rejects(err)

      const url = 'https://tokens.bch.sx/100/9fc89d6b7d5be2eac0b3787c5b8236bca5de641b5bafafc8f450727b63615c12.png'

      const result = await uut.urlIsValid(url)
      // console.log('result: ', result)

      assert.equal(result, false)
    })
  })
})
