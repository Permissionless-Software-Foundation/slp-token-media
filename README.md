# slp-token-media

This library is used to retrieve token icons and other media associated with an SLP token. It complies with [PS007 specification for token data](https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps007-token-data-schema.md) as well as the [tokens.bch.sx](https://tokens.bch.sx/) token icon server.

The primary function of this library is `getIcon()`. This expects an object as input with a `tokenId` property containing the Token ID of the SLP token. It returns an object with a property of `tokenIcon`, which contains a URL to the tokens icon.

```javascript
// Replace this with the token ID of the token data you want to retrieve.
const tokenId = 'e11a6cb24cc82cfdca6a2701237d661de331ac168641dedefa8643fd9527114c'

// npm libraries
const BchWallet = require('minimal-slp-wallet')
const SlpTokenMedia = require('slp-token-media')

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
```

Here is the output of the above example:
```javascript
result:  {
  tokenStats: {
    type: 1,
    ticker: 'CTAIA014',
    name: 'A Beautiful Face',
    tokenId: 'e11a6cb24cc82cfdca6a2701237d661de331ac168641dedefa8643fd9527114c',
    documentUri: 'ipfs://bafybeih7wvwdrg5xs3izvtefsyslgaimzpka4i4mpme27iwlm7632e46uy',
    documentHash: 'feb38d9ad25f26f6f1353b731fd62a4d1f1a691a3689a48af13c726a5cc19598',
    decimals: 0,
    mintBatonIsActive: false,
    tokensInCirculationBN: '1',
    tokensInCirculationStr: '1',
    blockCreated: 759246,
    totalBurned: '0',
    totalMinted: '1'
  },
  mutableData: {
    schema: 'ps007-v1.0.0',
    tokenIcon: 'https://ipfs-gateway.fullstackcash.nl/ipfs/bafybeibrc2khzgfwtfoefa7nb6oofsbremgkhwhgqam3txbghhwj7d6spa/beautiful-face.jpg',
    fullSizedUrl: '',
    nsfw: false,
    userData: '',
    jsonLd: {},
    about: 'This NFT was created using the PSF Token Studio at https://nft-creator.fullstack.cash',
    category: 'art',
    tags: [ 'nft', 'art', 'stable diffusion', 'face' ]
  },
  immutableData: {
    schema: 'ps007-v1.0.0',
    dateCreated: '2022-09-24T16:51:49.192Z',
    userData: '{\n' +
      '  "title": "CTAIA014 - AI Art by Chris Troutner",\n' +
      '  "about": "AI generated art. Generated from nightcafe.studio",\n' +
      '  "prompt": "a beautiful face hyperdetailed",\n' +
      '  "algorithm": "stable-diffusion"\n' +
      '}',
    jsonLd: {},
    issuer: 'NFT Creator by the FullStack.cash',
    issuerUrl: 'https://nft-creator.fullstack.cash/'
  },
  tokenIcon: '',
  fullSizedUrl: '',
  optimizedTokenIcon: 'https://p2wdb-gateway-678.fullstack.cash/ipfs/bafybeibrc2khzgfwtfoefa7nb6oofsbremgkhwhgqam3txbghhwj7d6spa/beautiful-face.jpg',
  optimizedFullSizedUrl: '',
  iconRepoCompatible: false,
  ps002Compatible: true
}

```

# Licence
[MIT](LICENSE.md)
