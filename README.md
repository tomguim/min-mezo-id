# mezo [![Build Status](https://img.shields.io/travis/tomguim/mezo/master.svg?style=flat-square)](https://travis-ci.org/tomguim/mezo) ![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square) 

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

🔑  Create Keybase PGP

⚖️  Create Ethereum Wallet

📸  Take Photo

📡  Image -> Hex -> Signed with Keybase PGP -> Swarm

🛰️  Swarm Hash -> Signed with Keybase PGP -> Hex -> Ethereum Blockchain

| Public  | Private |
| ------------- | ------------- |
| Name ✔️  | Name ✔️  |
| Image ✔️  | Image ✔️  |
| Keybase.io URL ✔️  | Keybase.io URL ✔️  |
| ETH Address ✔️  | ETH Address ✔️  |
| PGP Fingerprint ❌  | ETH Private Key ✔️  |
| PGP Public Key ❌  | ETH Seed ✔️ ✔️  |
| Swarm File Hash ✔️  | ETH Password ✔️  |
| ETH TxID of Signed Swarm File Hash ❌  | PGP Fingerprint ✔️  |
|   | PGP Public Key ❌  |
|   | PGP Private Key ❌  |
|   | Swarm File Hash ✔️  |
|   | ETH TxID of Signed Swarm File Hash ❌  |

![mezo flag](https://raw.githubusercontent.com/tomguim/mezo/master/file.jpg)

## Install

```bash
$ npm install
```

## Usage

### From Scratch

#### Create a new PGP Key
```bash
$ cd mezo
$ node createPGP.js
```

#### Create a new Ethereum Wallet
```bash
$ cd mezo
$ node createWallet.js
```

#### Create ID
```bash
$ cd mezo
$ node sign.js
```

### For those with Crypto

#### Use your own PGP Key
Edit pgpkey.txt and insert your PGP Private Key
Edit pgppass.txt and insert your PGP Private Key Password

#### Use your own Ethereum Wallet
Edit address.txt and insert your Ethereum Address
Edit secret.txt and insert your Ethereum Private Key

#### Create ID
In the console log you should get a string. This is the swarm file hash.
Sign the hash using the same PGP key previously used.
Hex the signed hash using http://tomeko.net/online_tools/ascii.php?lang=en
Deselect "0x and comma separator for output"
Send the Hex in the data box of an Ethereum transaction to 0xe63bFc1aA89FDF163Bba7f1D4E4a6D4d604E1710

The end result should look like this:
![ID](https://raw.githubusercontent.com/tomguim/mezo/master/ID.JPG0

## License

MIT © [Tom Guimberteau](https://keybase.io/tom_guimberteau)
