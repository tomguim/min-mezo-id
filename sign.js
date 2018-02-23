const sign = require('keybase-sign')

const privateKey =  `ENTER PGP PRIVATE KEY BLOCK HERE`

const message = 'ENTER MESSAGE HERE'
const passphrase = 'ENTER PASSWORD HERE' // Only required if private key is locked

try {
  sign(privateKey, message, passphrase).then(detachedSignature => {
    console.log(detachedSignature)
    /*
    -----BEGIN PGP MESSAGE-----
    Version: Keybase OpenPGP v2.0.68
    Comment: https://keybase.io/crypto

    yMCQAnicAUQBu/7EDQMACgFK7D7a1hCEhQHLFHUAWN58I1RoaXMgaXMgYSB0ZXN0
    ...
    -----END PGP MESSAGE-----
    */
  })
} catch(err) {
    console.log('There was an error signing', err)
}
