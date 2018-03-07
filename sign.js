// Dependancies
const swarm = require('swarm-js').at('http://swarm-gateways.net')
const sign = require('keybase-sign')
var express = require('express')
var app = express()
var fs = require('fs')

// Init
app.set('port', (process.env.PORT || 5002))
app.use(express.static(__dirname + '/public'))

// For Keybase
var pkey = fs.readFileSync('pgpkey.txt')
var pgpkey = pkey.toString('ascii')
var pass = fs.readFileSync('pgppass.txt')
var pgppass = pass.toString('ascii')
var im = fs.readFileSync('file.jpg')
var image = im.toString('hex')

// FOR KEYBASE
sign(pgpkey, image, pgppass)
      .then(sig => {
        console.log('The file was signed!')
        fs.writeFile('temp.txt', sig, function (err) {
          if (err) {
            return console.log(err)
          }
          console.log('The file was saved!');
          (async () => {
            try {
              const imagehash = await swarm.upload({path: 'temp.txt', kind: 'file'})
              console.log('Uploaded file. SwarmHash:', imagehash)
              sign(pgpkey, imagehash, pgppass)
              .then(sig => {
                console.log('The hash was signed!')
                fs.writeFile('temp.txt', sig, function (err) {
                  if (err) {
                    return console.log(err)
                  }
                  console.log('The file was saved!')
                  var temp = fs.readFileSync('temp.txt')
                  var imagehashhex = temp.toString('hex')
                  console.log(imagehashhex)
                  fs.writeFile('temp.txt', imagehashhex, function (err) {
                    if (err) {
                      return console.log(err)
                    }
                  })
                })
              })
            } catch (e) {
              console.log(e)
            }
          })()
        })
      })
