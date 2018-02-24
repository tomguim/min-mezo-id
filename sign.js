const sign = require('keybase-sign')
var fs = require('fs');
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
  })
} catch(err) {
    console.log('There was an error signing', err)
}
