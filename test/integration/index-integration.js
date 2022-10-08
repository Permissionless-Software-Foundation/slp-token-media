/*
  Integration tests for index.js
*/

// Global npm libraries
const SlpWallet = require('minimal-slp-wallet')
const assert = require('chai').assert

// Unit under test
const SlpTokenMedia = require('../../index.js')

describe('#index.js', () => {
  let uut

  beforeEach(async () => {
    const wallet = new SlpWallet(undefined, { interface: 'consumer-api' })
    await wallet.walletInfoPromise

    uut = new SlpTokenMedia({ wallet })
  })

  describe('#getIcon', () => {
    it('should get token icon URL for token with mutable data', async () => {
      const wallet = new SlpWallet(undefined, { interface: 'consumer-api' })
      await wallet.walletInfoPromise

      const uut = new SlpTokenMedia({ wallet })

      const tokenId = '293f388e3d8d7acb6ad8f0be135ade5ec4f97635cce5484d0326ef558a99e378'
      const data = await uut.getIcon({ tokenId })
      console.log('data: ', data)

      assert.equal(data.tokenIcon, 'https://bafybeia5f5sf2avwmegmuy4w4oljcfbt3pj7thrucsg26n3gb65fyteiqq.ipfs.w3s.link/sailboat-in-fog.jpg')
    })

    it('should get token icon URL for a token without mutable data', async () => {
      const tokenId = '9fc89d6b7d5be2eac0b3787c5b8236bca5de641b5bafafc8f450727b63615c11'
      const data = await uut.getIcon({ tokenId })
      console.log('data: ', data)
    })

    it('should optimize IPFS URL that does not resolve', async () => {
      const tokenId = 'd6073900bf75acfdb26314bb1c59ce12e223c31152eded1d20e9ca9b2d453f5c'
      const data = await uut.getIcon({ tokenId })
      console.log('data: ', data)
    })
  })

  // describe('#urlIsValid', () => {
  //   it('should validate a URL without downloading the file', async () => {
  //     const wallet = new SlpWallet(undefined, { interface: 'consumer-api' })
  //     await wallet.walletInfoPromise
  //
  //     const uut = new SlpTokenMedia({ wallet })
  //
  //     const url = 'https://tokens.bch.sx/100/9fc89d6b7d5be2eac0b3787c5b8236bca5de641b5bafafc8f450727b63615c11.png'
  //
  //     const result = await uut.urlIsValid(url)
  //     // console.log('result: ', result)
  //
  //     assert.equal(result, true)
  //   })
  //
  //   it('should return false for invalid URL', async () => {
  //     const wallet = new SlpWallet(undefined, { interface: 'consumer-api' })
  //     await wallet.walletInfoPromise
  //
  //     const uut = new SlpTokenMedia({ wallet })
  //
  //     const url = 'https://tokens.bch.sx/100/9fc89d6b7d5be2eac0b3787c5b8236bca5de641b5bafafc8f450727b63615c12.png'
  //
  //     const result = await uut.urlIsValid(url)
  //     // console.log('result: ', result)
  //
  //     assert.equal(result, false)
  //   })
  // })
})
