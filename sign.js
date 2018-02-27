// Dependancies
const swarm = require('swarm-js').at('http://swarm-gateways.net')
const sign = require('keybase-sign')
var express = require('express')
var app = express()
var Tx = require('ethereumjs-tx')
var fs = require('fs')
var request = require('request')

// Init
app.set('port', (process.env.PORT || 5002))
app.use(express.static(__dirname + '/public'))

// For Keybase
var pkey = fs.readFileSync('pgpkey.txt')
var pgpkey = pkey.toString('ascii')
var pass = fs.readFileSync('pgppass.txt')
var pgppass = pass.toString('ascii')
var im = fs.readFileSync('file.jpeg')
var image = im.toString('hex')

// From Wallet Generation
var ekey = fs.readFileSync('secret.txt')
var ethkey = ekey.toString('ascii')
var addrs = fs.readFileSync('address.txt')
var address = addrs.toString('ascii')

// For Ethereum
const privateKey = Buffer.from(ethkey, 'hex')
var recievingAddress = '0xe63bFc1aA89FDF163Bba7f1D4E4a6D4d604E1710'
var blockkey = fs.readFileSync('blockcypher.txt')
var blockcypherKey = blockkey.toString('ascii')

// FOR KEYBASE
sign(pgpkey, image, pgppass)
      .then(sig => {
        console.log('The file was signed!')
        fs.writeFile('temp.txt', sig, function (err) {
          if (err) {
            return console.log(err)
          }
          console.log('The file was saved!')
          swarm.upload({
            path: 'temp.txt',      // path to data / file / directory
            kind: 'file'})          // could also be "file" or "data"
              .then(console.log)
              // imagehash = _______
              .catch(console.log)
        })
      })

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
          console.log('The file was saved!')
        })
        request({
          url: 'https://api.blockcypher.com/v1/eth/main/addrs/' + address + '/balance',
          method: 'GET'
        }, function (error, response, body) {
          if (error) {
            console.log(error)
          } else {
              // Parse response (current accout total tx's)
            var getNonce = JSON.parse(body)

              // Confirm the transaction in the console
            console.log('Sending sending 0.0001 ETH to 0x' + recievingAddress)
            console.log('With data: ' + imagehashhex)
            console.log('Getting gasPrice....')

              // Get the current gasPrice of the network
            request({
              url: 'https://api.blockcypher.com/v1/eth/main',
              method: 'GET'
            }, function (error, response, body) {
              if (error) {
                console.log(error)
              } else {
                  // Parse response (ETH network stats)
                var getGasPrice = JSON.parse(body)

                console.log('Building....')
                  // Intigers of gasLimit & gasPrice (20% higher for priority)
                  // 21000 is the default gasLimit network wide currently
                var gasLimit = 21000 * 1.2
                var gasPrice = Math.round(getGasPrice.high_gas_price * 1.2)

                  // Convert to hex for rawTx
                var gasPriceHex = gasPrice.toString(16)
                var gasLimitHex = gasLimit.toString(16)

                  // Build the raw transaction as hex
                  // Subtract total TX address has recieved
                var rawTx = {
                  nonce: parseInt(getNonce.final_n_tx) - 1,
                  gasPrice: '0x' + gasPriceHex,
                  gasLimit: '0x' + gasLimitHex,
                  to: '0x' + recievingAddress,
                  value: '0x5af3107a4000', // 0.0001 ETH (Hard set)
                  data: '0x' + imagehashhex
                }

                  // Sign and seralize the raw transaction
                console.log('Signing....')
                var tx = new Tx(rawTx)
                tx.sign(privateKey)
                var serTx = tx.serialize().toString('hex')

                  // Broadcast the transaction with BlockCypher
                blockCypherBroadcast(serTx)
              }
            })
          }
        })
        function blockCypherBroadcast (serTx) {
          console.log('Broadcasting....')
          request({
            url: 'https://api.blockcypher.com/v1/eth/main/txs/push?token=' + blockcypherKey,
            method: 'POST',
            json: {
              tx: serTx
            }
          }, function (error, response, body) {
            if (error) {
              console.log(error)
            } else {
              console.log('Success!')
              console.log(body)
            }
          })
        }
      })
