/*
  Integration tests for index.js
*/

// Global npm libraries
const SlpWallet = require('minimal-slp-wallet/index.js')

// Unit under test
const SlpTokenMedia = require('../../index.js')

describe('#index.js', () => {
  describe('#getIcon', () => {
    it('should get token icon', async () => {
      const wallet = new SlpWallet(undefined, { interface: 'consumer-api' })
      await wallet.walletInfoPromise

      const uut = new SlpTokenMedia({ wallet })

      const tokenId = '293f388e3d8d7acb6ad8f0be135ade5ec4f97635cce5484d0326ef558a99e378'
      const data = await uut.getIcon({ tokenId })
      console.log('data: ', data)
    })
  })
})
