const { Client } = require("pg");

const DatabaseClient = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "discordCzarus",
});

module.exports = {
  DatabaseClient,
};
