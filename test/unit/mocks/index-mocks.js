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

module.exports = {
  tokenData01,
  tokenData02
}
