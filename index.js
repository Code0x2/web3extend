"use strict"

function extendAll(web3) {
  return extendEVM(extendNet(extendTrace(web3)))
}

function extendEVM(web3) {
  return web3.extend({ // extend evm methods for ganache
    property:'evm',
    methods:[{
      name:'unlockUnknownAccount',
      call:'evm_unlockUnknownAccount',
      params: 1
    }, {
      name:'mine',
      call:'evm_mine'
    }, {
      name:'snapshot',
      call:'evm_snapshot',
      params: 0,
      outputFormatter: web3.utils.hexToNumberString,
    }, {
      name:'revert',
      call:'evm_revert',
      params: 1,
      inputFormatter: [web3.extend.formatters.inputBlockNumberFormatter]
    }]
  })
}

function extendNet(web3) {
  return web3.extend({ // extend evm methods
    property:'net',
    methods:[{
      name:'listening',
      call:'net_listening',
      params: 0
    }, {
      name:'peerCount',
      call:'net_peerCount',
      params: 0,
      outputFormatter: web3.utils.hexToNumberString
    }, {
      name:'version',
      call:'net_version',
      params: 0
    }]
  })
}

function extendTrace(web3) { // extends web3 for usage with parity's `trace` module
  return web3.extend({
    property:'trace',
    methods:[{
      name:'call',
      call:'trace_call',
      params:2
    }, {
      name:'callMany',
      call:'trace_callMany',
      params:2
    }, {
      name:'rawTransaction',
      call:'trace_rawTransaction',
      params:2
    }, {
      name:'replayBlockTransactions',
      call:'trace_replayBlockTransactions',
      params:2,
      inputFormatter: [web3.extend.formatters.inputBlockNumberFormatter,null]
    }, {
      name:'replayTransaction',
      call:'trace_replayTransaction',
      params:2
    }, {
      name:'block',
      call:'trace_block',
      params:1,
      inputFormatter: [web3.extend.formatters.inputBlockNumberFormatter]
    }, {
      name:'filter',
      call:'trace_filter',
      params:1
    }, {
      name:'get',
      call:'trace_get',
      params:2
    }, {
      name:'transaction',
      call:'trace_transaction',
      params:1
    }]
  })
} // note: some methods must be manually hexified, due to the fact that it takes arrays with hexified values inside

module.exports = {
  extendAll:extendAll,
  extendEVM:extendEVM,
  extendNet:extendNet,
  extendTrace:extendTrace,
}
