const sign = require('keybase-sign')

const privateKey =  `ENTER PGP PRIVATE KEY BLOCK HERE`

const message = 'ENTER MESSAGE HERE'
const passphrase = 'ENTER PASSWORD HERE' // Only required if private key is locked

function hex2a(hexx) {
    var hex = hexx.toString();
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

function a2hex(str) {
  var arr = [];
  for (var i = 0, l = str.length; i < l; i ++) {
    var hex = Number(str.charCodeAt(i)).toString(16);
    arr.push(hex);
  }
  return arr.join('');
}

try {
  sign(privateKey, message, passphrase).then(detachedSignature => {
    console.log(detachedSignature)
    absolute = a2hex(detachedSignature) //convert to hex
    console.log('0x' + absolute) //convert to hex

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
