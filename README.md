# slp-token-media

This library is used to retrieve token icons and other media associated with an SLP token. It complies with [PS007 specification for token data](https://github.com/Permissionless-Software-Foundation/specifications/blob/master/ps007-token-data-schema.md) as well as the [tokens.bch.sx](https://tokens.bch.sx/) token icon server.

The primary function of this library is `getIcon()`. This expects an object as input with a `tokenId` property containing the Token ID of the SLP token. It returns an object with a property of `tokenIcon`, which contains a URL to the tokens icon.

Those same input and output objects are used for more advanced usage.

```javascript
// Insert example code for the simplest use case here
```

# Licence
[MIT](LICENSE.md)
