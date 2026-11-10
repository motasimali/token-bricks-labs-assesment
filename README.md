# Engineering Assessment

## 📝 Objective

The goal of this assessment is to evaluate your ability to:

Work with Web3 technologies and integrate blockchain functionality into a decentralized application (dApp).

---

## 📌 Task Instructions

### 1. Create a New API Endpoint

Add a new route in `src/index.js` named:

```
/api/[YourName]ApiTest
```

### 2. Smart Contract Interaction

- Select any **pre-deployed** or **public smart contract** (mainnet or testnet).
- Fetch some data — balance, contract state, public variables, latest block number, etc.
- Return the result as JSON through your new endpoint.

> 💡 You can use the `callRpc` helper in `src/config/getContract.js` to make JSON-RPC calls to any supported chain — **no API key required**.

### 3. Output

- Return the fetched data as a JSON response.
- Print the result to the console as well.
- No UI or database persistence needed — just demonstrate successful data fetching.

---

## ⚙️ Supported Chains (no key needed)

| Chain     | Network         |
|-----------|-----------------|
| ethereum  | Ethereum Mainnet |
| polygon   | Polygon Mainnet  |
| bsc       | BNB Smart Chain  |
| arbitrum  | Arbitrum One     |
| avalanche | Avalanche C-Chain|
| optimism  | Optimism         |
| fantom    | Fantom Opera     |
| xdai      | Gnosis Chain     |

All RPC endpoints are free and public — no signup required.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm run dev
```

The server starts on `http://localhost:3001` by default.

---

## Assessment Endpoint

### `GET /api/MotasimAliApiTest`

Reads the Wrapped Ether (WETH) contract on **Arbitrum One** using the existing
`callRpc` helper. It fetches the latest block number, then reads `decimals()` and
`totalSupply()` at that same block. The result is returned as JSON and printed
to the server console.

- **Contract:** `0x82aF49447D8a07e3bd95BD0d56f35241523fBab1`
- **Address reference:** [Arbitrum token bridge contracts](https://developer.arbitrum.io/chain-info#token-bridge-smart-contracts)
- **RPC:** `https://arb1.arbitrum.io/rpc`
- **Request parameters:** None. No wallet or API key is required.

With the server running:

```bash
curl http://localhost:3001/api/MotasimAliApiTest
```

**Success — HTTP 200**

Example response from a verified read; block number and supply change over time:

```json
{
  "chain": "arbitrum",
  "contractAddress": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
  "blockNumber": 523109075,
  "decimals": 18,
  "totalSupplyRaw": "123317910459975122806982",
  "totalSupplyFormatted": "123317.910459975122806982"
}
```

| Field | Description |
|-------|-------------|
| `chain` | Chain key used by the RPC helper. |
| `contractAddress` | WETH contract queried on Arbitrum One. |
| `blockNumber` | Block used for both contract reads. |
| `decimals` | Number of decimal places used by the token. |
| `totalSupplyRaw` | Total supply in the token's smallest units, as a string. |
| `totalSupplyFormatted` | Total supply in WETH units, as a decimal string. |

Supply values use strings to preserve precision.

**Failure — HTTP 502**

If fetching or decoding fails, the endpoint logs the error and returns:

```json
{
  "error": "Failed to fetch Arbitrum WETH data"
}
```

Each RPC request has a 10-second timeout.

---

## 📤 Submission

Submit any one of:

- **short video** recording (3-5 mins) your code and result using loom.com
- **screenshots** showing the API call and console result.
- Upload the project you worked on to **Your GitHub puclic link and share it**

---

## ⏰ Time Expectation

Estimated: **30–40 minutes**

---

## 📝 Notes

- Use any Web3 library you prefer: `ethers.js`, `web3.js`, or plain `axios` with the `callRpc` helper.
- Keep the code **clean and simple**.
- Handle errors gracefully where possible.
