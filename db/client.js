const { Client } = require("pg");

const dbName = `Shopper`;

const client = new Client({
  connectionString:
    process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`,
});

client.connect();

module.exports = client;
