/*
  Mock data for index-unit.js unit tests
*/

const tokenData01 = {
  tokenStats: {
    type: 1,
    ticker: 'CTAIA003',
    name: 'Sailboat In The Fog',
    tokenId: '293f388e3d8d7acb6ad8f0be135ade5ec4f97635cce5484d0326ef558a99e378',
    documentUri: 'ipfs://bafybeigjxnzppdg4i4jrd4nb5psnndvtfqmugvr4agahjf7f4logvskohi',
    documentHash: '4a418b23bf2f90438580d28b83358282f12ca22b437908d0727e836df7f82403',
    decimals: 0,
    mintBatonIsActive: false,
    tokensInCirculationBN: '1',
    tokensInCirculationStr: '1',
    blockCreated: 757460,
    totalBurned: '0',
    totalMinted: '1'
  },
  mutableData: {
    tokenIcon: 'https://bafybeia5f5sf2avwmegmuy4w4oljcfbt3pj7thrucsg26n3gb65fyteiqq.ipfs.w3s.link/sailboat-in-fog.jpg',
    fullSizedUrl: 'https://bafybeia5f5sf2avwmegmuy4w4oljcfbt3pj7thrucsg26n3gb65fyteiqq.ipfs.w3s.link/sailboat-in-fog.jpg',
    about: 'This NFT was created using the PSF Token Studio at https://nft-creator.fullstack.cash',
    userData: ''
  },
  immutableData: {
    issuer: 'http://psfoundation.cash',
    website: 'https://nft-creator.fullstack.cash',
    dateCreated: '9/12/2022, 8:00:51 AM',
    userData: '{\n' +
      '  "title": "CTAIA003 - AI Art by Chris Troutner",\n' +
      '  "about": "AI generated art. Generated from nightcafe.studio",\n' +
      '  "prompt": "little cabin island fog sunrise birds dock sailboat calm peaceful",\n' +
      '  "algorithm": "stable-diffusion"\n' +
      '}'
  },
  tokenIcon: 'https://bafybeia5f5sf2avwmegmuy4w4oljcfbt3pj7thrucsg26n3gb65fyteiqq.ipfs.w3s.link/sailboat-in-fog.jpg',
  fullSizedUrl: ''
}

const tokenData02 = {
  immutableData: {},
  mutableData: {},
  tokenStats: {
    type: 1,
    ticker: 'USDt',
    name: 'Tether USDt',
    tokenId: '9fc89d6b7d5be2eac0b3787c5b8236bca5de641b5bafafc8f450727b63615c11',
    documentUri: 'https://tether.to',
    documentHash: '',
    decimals: 8,
    mintBatonIsActive: true,
    tokensInCirculationBN: '599653644767688',
    tokensInCirculationStr: '599653644767688',
    blockCreated: 636706,
    totalBurned: '1597065620238',
    totalMinted: '601250710387926'
  }
}

// A token with IPFS-based token Icon URL that does not resolve. Used to test
// ability to optimize an invalid URL.
const tokenData03 = {
  immutableData: {
    schema: 'ps007-v1.0.1',
    dateCreated: '2022-10-02T14:43:07.571Z',
    userData: '{\n  "title": "CTMEME005 - Meme Preservation by Chris Troutner",\n  "about": "This series of NFTs are used to preserve memes for historical purposes.",\n  "source": "https://twitter.com/FOUNDATIONdvcs/status/1575563401765552171"\n}',
    jsonLd: {},
    issuer: 'NFT Creator by the FullStack.cash',
    issuerUrl: 'https://nft-creator.fullstack.cash/',
    license: ''
  },
  mutableData: {
    schema: 'ps007-v1.0.1',
    tokenIcon: 'https://p2wdb-gateway.fullstack.cash/ipfs/bafybeif4pu6fzpqik4sjggfdjdm6pwnm3jf6dbcjdox5gamzljuurw5u5e/purchasing-power-tweet.png',
    fullSizedUrl: '',
    nsfw: false,
    userData: '',
    jsonLd: {},
    about: 'This NFT was created using the PSF Token Studio at https://nft-creator.fullstack.cash',
    category: 'meme',
    tags: [
      'bitcoin',
      'meme',
      'currency',
      'fiat'
    ],
    mediaType: 'image',
    currentOwner: {}
  },
  tokenStats: {
    type: 1,
    ticker: 'CTMEME005',
    name: 'Purchasing Power Loss Since 2015',
    tokenId: 'd6073900bf75acfdb26314bb1c59ce12e223c31152eded1d20e9ca9b2d453f5c',
    documentUri: 'ipfs://bafybeie7cc3y2bviy37zfkkuuo2e5ydecalpcjyyzm4oodmnejdn67jnoi',
    documentHash: '19f5a4a8024c334a750cd6c1364b794fb0944246c40eb08258dd6ada85f4d6ae',
    decimals: 0,
    mintBatonIsActive: false,
    tokensInCirculationBN: '1',
    tokensInCirculationStr: '1',
    blockCreated: 760358,
    totalBurned: '0',
    totalMinted: '1'
  }
}

module.exports = {
  tokenData01,
  tokenData02,
  tokenData03
}
