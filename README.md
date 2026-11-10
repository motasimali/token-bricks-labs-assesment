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
