const { getClient } = require("./getClient");

const setupDatabase = async () => {
  const client = await getClient();
  const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS why_responses(
      id BIGSERIAL PRIMARY KEY NOT NULL,
      name varchar
    );
    CREATE TABLE IF NOT EXISTS does_responses(
      id BIGSERIAL PRIMARY KEY NOT NULL,
      name varchar
    );
    CREATE TABLE IF NOT EXISTS when_responses(
      id BIGSERIAL PRIMARY KEY NOT NULL,
      name varchar
    );
    CREATE TABLE IF NOT EXISTS do_you_think_responses(
      id BIGSERIAL PRIMARY KEY NOT NULL,
      name varchar
    );
    CREATE TABLE IF NOT EXISTS how_responses(
      id BIGSERIAL PRIMARY KEY NOT NULL,
      name varchar
    );
    CREATE TABLE IF NOT EXISTS who_responses(
      id BIGSERIAL PRIMARY KEY NOT NULL,
      name varchar
    );
    CREATE TABLE IF NOT EXISTS what_responses(
      id BIGSERIAL PRIMARY KEY NOT NULL,
      name varchar
    );
  `;
  const res = await client.query(createTablesQuery);
  console.log(`Created tables.`);
  await client.end();
};

module.exports = { setupDatabase };
