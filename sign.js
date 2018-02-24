const sign = require('keybase-sign')
var fs = require('fs');

var e = fs.readFileSync('key.txt');
var a = e.toString('ascii');

var f = fs.readFileSync('file.jpeg');
var b = f.toString('hex');

var g = fs.readFileSync('password.txt');
var c = g.toString('ascii');

try {
  sign(a, b, c).then(d => {
    var d = d
    console.log(d)
  })
} catch(err) {
    console.log('There was an error signing', err)
}
