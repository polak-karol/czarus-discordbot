const { Client } = require("pg");
require("dotenv").config();

module.exports.getClient = async () => {
  const clientBody = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
  };

  if (process.env.SUPPORT_SSL === "true")
    clientBody.ssl = { rejectUnauthorized: false };

  const client = new Client(clientBody);
  await client.connect();
  return client;
};
