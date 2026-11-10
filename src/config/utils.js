const crypto = require("crypto");

const utils = {
  // Generate a random hex ID
  generateId: (length = 8) => {
    return crypto.randomBytes(length).toString("hex");
  },

  // fetch data json format
  fetchJson: async (src) => {
    const res = await fetch(src, {
      headers: { "User-Agent": "axios", Accept: "application/json" },
      redirect: "follow",
    });
    const json = await res.json();
    return json;
  },

  // Format a date as readable UTC string
  formatDate: (date) => {
    return new Date(date).toISOString().replace("T", " ").split(".")[0];
  },

  // Safely get a nested property from an object
  getNested: (obj, path, defaultValue = null) => {
    return path
      .split(".")
      .reduce(
        (acc, key) => (acc && acc[key] !== undefined ? acc[key] : defaultValue),
        obj,
      );
  },

  pluginSync: async (src, plugin) => {
    const data = await utils.fetchJson(src);
    console.log(data);
    //callback(data);
  },
};

module.exports = utils;
