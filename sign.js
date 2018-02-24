const sign = require('keybase-sign')
var fs = require('fs');

var key = fs.readFileSync('key.txt');
var privatekey = key.toString('ascii');

var pass = fs.readFileSync('password.txt');
var password = pass.toString('ascii');

var im = fs.readFileSync('file.jpeg');
var image = im.toString('hex');

try {
  sign(privatekey, image, password).then(sig => {
    var sig = sig
    console.log(sig)
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
