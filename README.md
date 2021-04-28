# Web3Extend
Web3Extend is a module that adds in modules that are commonly used but not in the default web3.js package.

### Example
```js
const Web3 = require('web3')
const web3extend = require('@code0x2/web3extend')
const web3 = web3extend.extendAll(new Web3(<rpc address>))
```

### Supported modules
extendEVM() - the evm module for ganache

extendNet() - the net module from geth

extendTrace() - the trace module from openethereum
