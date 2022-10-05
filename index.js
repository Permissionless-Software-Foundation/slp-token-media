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

      // Optimize the media URLs to use the desired IPFS Gateways and URL format.
      let optimizedTokenIcon = ''
      if (data.mutableData.tokenIcon) {
        optimizedTokenIcon = this.optimizeUrl(data.mutableData.tokenIcon)
      }
      let optimizedFullSizedUrl = ''
      if (data.mutableData.fullSizedUrl) {
        optimizedFullSizedUrl = this.optimizeUrl(data.mutableData.fullSizedUrl)
      }

      const dataObj = {
        tokenStats: data.tokenStats,
        mutableData: data.mutableData,
        immutableData: data.immutableData,
        tokenIcon: data.mutableData.tokenIcon,
        fullSizedUrl: data.mutableData.fullSizedUrl,
        optimizedTokenIcon,
        optimizedFullSizedUrl
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

  // This function tries to optimize a media URL by following the PS007 spec.
  // It can also override the IPFS gateway in the URL and replace it with
  // the gateway specified when instantiating this library.
  //
  // This function expects an input that is either a string or an object. If
  // it is an object, it is expected to follow the PS007 specification.
  // This function returns a string which is a URL to the media (token icon or
  // other media in the fullSizedUrl).
  // PS007:
  // https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps007-token-data-schema.md
  optimizeUrl (entry) {
    if (!entry) {
      throw new Error('optimizeUrl() expects a string or object as input.')
    }

    let entryIsString = true
    if (typeof (entry) !== 'string') entryIsString = false

    if (typeof (entry) !== 'object' && !entryIsString) {
      throw new Error('entry is neither a string nor an object')
    }

    let outStr = ''

    if (entryIsString) {
      // Entry is a string

      // This regex is used to extract v0 and v1 CIDs.
      const regex = /Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,}/

      // Extract the CID from the string if it exists.
      const match = entry.match(regex)
      const cid = match[0]
      // console.log('cid: ', cid)

      // Deconstruct the URL
      const url = new URL(entry)
      // console.log('url: ', url)
      const pathname = url.pathname

      // Find the correct path to append to the CID.
      const splitPath = pathname.split(cid)
      // console.log('splitPath: ', splitPath)
      const correctPath = splitPath[splitPath.length - 1]

      if (this.cidUrlType === 1) {
        outStr = `https://${this.ipfsGatewayUrl}/ipfs/${cid}${correctPath}`
      } else {
        if (cid.includes('Qm')) {
          // CID v0 do not work for Url type 2. In this case, return the original entry.
          outStr = entry
        } else {
          // CID v1
          outStr = `https://${cid}.${this.ipfsGatewayUrl}${correctPath}`
        }
      }
    } else {
      // Entry is an object

      if (!entry.default) {
        throw new Error('Media does not follow PS007. Media is an object, but has no default property.')
      }

      // By default, return the default URL.
      outStr = entry.default

      // If the objects has an IPFS property, use that.
      if (entry.ipfs) {
        let cid = entry.ipfs.cid

        // If the CID contains a prefix, remove it.
        if (cid.includes('ipfs://')) {
          cid = cid.slice(7)
        }

        const path = entry.ipfs.path

        if (this.cidUrlType === 1) {
          outStr = `https://${this.ipfsGatewayUrl}/ipfs/${cid}${path}`
        } else {
          if (cid.includes('Qm')) {
            // CID v0 do not work for Url type 2. In this case, return the original entry.
            outStr = entry.default
          } else {
            // CID v1
            outStr = `https://${cid}.${this.ipfsGatewayUrl}${path}`
          }
        }
      } else {
        // If no ipfs property is defined in the entry, then recursively call
        // this function the string in the default property.
        outStr = this.optimizeUrl(entry.default)
      }
    }

    return outStr
  }
}

module.exports = SlpTokenMedia
