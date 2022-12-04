/*
  This example shows how to exercise the main function of this library: getIcon()
  This function returns mutable and immutable token data. It will attempt to
  optimize the URL for the token icon.
*/

// Replace this with the token ID of the token data you want to retrieve.
const tokenId = 'e11a6cb24cc82cfdca6a2701237d661de331ac168641dedefa8643fd9527114c'
// const tokenId = '1c51b35fadd13958467e7baeaf1ff86cc0d27024a515c221f8216b03432f586f'
// const tokenId = '5c8cb997cce61426b7149a74a3997443ec7eb738c5c246d9cfe70185a6911476'

// npm libraries
const BchWallet = require('minimal-slp-wallet')
const SlpTokenMedia = require('../index.js')

async function start () {
  try {
    // Initialize a BCH wallet.
    const wallet = new BchWallet(undefined, { interface: 'consumer-api' })
    await wallet.walletInfoPromise

    // Initialize this library.
    const slpTokenMedia = new SlpTokenMedia({ wallet })

    // Get token data.
    const result = await slpTokenMedia.getIcon({ tokenId })
    console.log('result: ', result)
  } catch (err) {
    console.error('Error in start(): ', err)
  }
}
start()
