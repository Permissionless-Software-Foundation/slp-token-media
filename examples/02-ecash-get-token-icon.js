/*
  Same as example 01, but for the eCash blockchain.
*/

// Replace this with the token ID of the token data you want to retrieve.
const tokenId = 'f3584d8882c46e42dfb0d5d132df18939ed8a04140b0bc4985c82aab9188af13'

// npm libraries
const BchWallet = require('minimal-ecash-wallet')
const SlpTokenMedia = require('../index.js')

async function start () {
  try {
    // Initialize a BCH wallet.
    const wallet = new BchWallet(undefined, {
      interface: 'consumer-api',
      restURL: 'https://xec-consumer-or1-usa.fullstackcash.nl',
      ipfsGatewayUrl: 'xec-p2wdb-gateway.fullstack.cash'
    })
    await wallet.walletInfoPromise

    // Initialize this library.
    const slpTokenMedia = new SlpTokenMedia({
      wallet,
      ipfsGatewayUrl: 'xec-p2wdb-gateway.fullstack.cash'
    })

    // Get token data.
    const result = await slpTokenMedia.getIcon({ tokenId })
    console.log('result: ', result)
  } catch (err) {
    console.error('Error in start(): ', err)
  }
}
start()
