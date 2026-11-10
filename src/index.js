const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const killPort = require("kill-port");
const { callRpc } = require("./config/getContract");

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 3001;

// const dbHandler = require("./config/dbHandler.js");

const checkPort = async (port, maxPort = 65535) => {
  if (port > maxPort) {
    throw new Error("No available ports found");
  }

  try {
    await killPort(port, "tcp");
    await killPort(port, "udp");
    return port;
  } catch (err) {
    return checkPort(port + 1, maxPort);
  }
};
///////////////////////////////////////////////////////////////////////
////////////////// Code here within 30–40 minutes. ////////////////////
/////////////////////////////////////////////////////////////////////// 







///////////////////////////////////////////////////////////////////////

(async () => {
  const safePort = await checkPort(PORT);
  const getPort = (await import("get-port")).default; // dynamic import
  const final_port = await getPort({ port: safePort });

  console.log(`Port ${final_port} is free. Ready to start server.`);

  // Middleware
  app.use(cors({ origin: `http://localhost:${final_port}` }));
  app.use(express.json());
  app.use(morgan("dev"));
  // dbHandler.connect();

  // Routes
  app.use("/api/items", require("./routes/items"));
  app.use("/api/stats", require("./routes/stats"));

  /**
   * Reads WETH decimals and total supply on Arbitrum at the same block.
   * Logs and returns the result as JSON, with supply values represented as
   * strings to preserve precision. Returns HTTP 502 if the read fails.
   */
  app.get("/api/MotasimAliApiTest", async (req, res) => {
    const chain = "arbitrum";
    const contractAddress = "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1";

    try {
      const block = await callRpc(chain, "eth_blockNumber");
      const [decimalsHex, totalSupplyHex] = await Promise.all([
        callRpc(chain, "eth_call", [
          { to: contractAddress, data: "0x313ce567" }, // decimals()
          block,
        ]),
        callRpc(chain, "eth_call", [
          { to: contractAddress, data: "0x18160ddd" }, // totalSupply()
          block,
        ]),
      ]);

      const decimals = Number(BigInt(decimalsHex));
      const totalSupplyRaw = BigInt(totalSupplyHex).toString();
      const digits = totalSupplyRaw.padStart(decimals + 1, "0");
      const totalSupplyFormatted = decimals === 0
        ? totalSupplyRaw
        : `${digits.slice(0, -decimals)}.${digits.slice(-decimals)}`;
      const result = {
        chain,
        contractAddress,
        blockNumber: Number(BigInt(block)),
        decimals,
        totalSupplyRaw,
        totalSupplyFormatted,
      };

      console.log(result);
      res.json(result);
    } catch (error) {
      console.error("Failed to fetch Arbitrum WETH data:", error.message);
      res.status(502).json({ error: "Failed to fetch Arbitrum WETH data" });
    }
  });

  // Serve static files in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
  }

  // Start server
  app.listen(final_port, () => {
    console.log(`Backend running on http://localhost:${final_port}`);
  });
})();
