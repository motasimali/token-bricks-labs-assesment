const axios = require('axios');

const {
  EthMainnet, PolygonMainnet, BscMainnet, ArbitrumMainnet,
  Avalanche, Fantom, Harmony, Heco, Klay, Matic,
  Moonbeam, Optimism, Ronin, xDai
} = require('./constant');

const RPC_URLS = {
  ethereum: EthMainnet,
  polygon:  PolygonMainnet,
  bsc:      BscMainnet,
  arbitrum: ArbitrumMainnet,
  avalanche: Avalanche,
  fantom:   Fantom,
  harmony:  Harmony,
  heco:     Heco,
  klaytn:   Klay,
  matic:    Matic,
  moonbeam: Moonbeam,
  optimism: Optimism,
  ronin:    Ronin,
  xdai:     xDai,
};

/**
 * Make a raw JSON-RPC call to a given chain.
 * @param {string} chain - Key from RPC_URLS (e.g. 'ethereum')
 * @param {string} method - JSON-RPC method (e.g. 'eth_blockNumber')
 * @param {Array}  params - Parameters for the method
 */
const callRpc = async (chain, method, params = []) => {
  const url = RPC_URLS[chain];
  if (!url) throw new Error(`Unknown chain: ${chain}`);

  const response = await axios.post(url, {
    jsonrpc: '2.0',
    method,
    params,
    id: 1,
  });

  if (response.data.error) {
    throw new Error(`RPC error: ${response.data.error.message}`);
  }

  return response.data.result;
};

module.exports = { callRpc, RPC_URLS };
