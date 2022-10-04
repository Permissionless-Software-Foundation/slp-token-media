/*
  An npm JavaScript library for front end web apps. Implements a minimal
  Bitcoin Cash wallet.
*/

class SlpTokenMedia {
  constructor () {
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
  }

  // Get the icon for a token, given it's token ID.
  async getIcon (tokenId) {
    // Input validation
    if (!tokenId || tokenId.length !== 64) {
      throw new Error('getIcon() requires a 64 character token ID as input.')
    }
  }
}

module.exports = SlpTokenMedia
