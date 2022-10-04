/*
  An npm JavaScript library for front end web apps. Implements a minimal
  Bitcoin Cash wallet.
*/

// Global npm libraries
const { SlpMutableData } = require('slp-mutable-data/index')

class SlpTokenMedia {
  constructor (localConfig = {}) {
    // Dependency injection
    this.wallet = localConfig.wallet
    if (!this.wallet) {
      throw new Error(
        'Instance of minimal-slp-wallet must be passed as wallet when instantiating this library.'
      )
    }

    // cidUrlType has a value of 1 or 2:
    // 1 - The CID should go at the end, as a directory.
    // 2 - The CID should go at the beginning of the URL, as a subdomain.
    this.cidUrlType = 1
    if (localConfig.cidUrlType) this.cidUrlType = localConfig.cidUrlType

    // The Gateway URL is used to retrieve IPFS data.
    this.ipfsGatewayUrl = 'ipfs-gateway.fullstackcash.nl' // Type 1 CID URL.
    // this.ipfsGatewayUrl = 'ipfs.dweb.link/data.json' // Type 2 CID URL.
    if (localConfig.ipfsGatewayUrl) this.ipfsGatewayUrl = localConfig.ipfsGatewayUrl

    // State
    this.state = {
      // The token ID cache is an array of Token IDs that have been processed.
      // Each token ID in the array corresponds to a property in the
      // tokenDataCache object.
      tokenIdsCache: [],

      // The token data cache contains data (like the token icon) about the
      // token. The object has a property that matches the token ID of the token.
      tokenDataCache: {}
    }

    const slpMutableDataOptions = {
      wallet: this.wallet,
      cidUrlType: this.cidUrlType,
      ipfsGatewayUrl: this.ipfsGatewayUrl
    }

    // Encapsulate dependencies
    this.slpMutableData = new SlpMutableData(slpMutableDataOptions)
  }

  // Get the icon for a token, given it's token ID.
  async getIcon (inObj = {}) {
    try {
      const { tokenId } = inObj

      // Input validation
      if (!tokenId || tokenId.length !== 64) {
        throw new Error('getIcon() requires a 64 character token ID as input.')
      }

      // If the data is already in the cache, return that first.
      if (this.state.tokenIdsCache.includes(tokenId)) {
        return this.state.tokenDataCache[tokenId]
      }

      // Token ID does not exist in the cache.

      // Get the mutable data for the token.
      const data = await this.slpMutableData.get.data(tokenId)
      // console.log(`data: ${JSON.stringify(data, null, 2)}`)

      const dataObj = {
        tokenStats: data.tokenStats,
        mutableData: data.mutableData,
        immutableData: data.immutableData,
        tokenIcon: data.mutableData.tokenIcon,
        fullSizedUrl: data.mutableData.fullSizedUrl
      }

      // Update the caches
      this.state.tokenIdsCache.push(tokenId)
      this.state.tokenDataCache[tokenId] = dataObj

      return dataObj
    } catch (err) {
      console.error('Error in getIcon()')
      throw err
    }
  }
}

module.exports = SlpTokenMedia
