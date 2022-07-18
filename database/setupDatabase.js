const { getClient } = require("./getClient");

const setupDatabase = async () => {
  const client = await getClient();
  const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS why_answers(
      id BIGSERIAL PRIMARY KEY NOT NULL,
      answer VARCHAR(300),
      guild_id VARCHAR(300)
    );
    CREATE TABLE IF NOT EXISTS does_answers (
      id BIGSERIAL PRIMARY KEY NOT NULL,
      answer VARCHAR(300),
      guild_id VARCHAR(300)
    );
    CREATE TABLE IF NOT EXISTS when_answers (
      id BIGSERIAL PRIMARY KEY NOT NULL,
      answer VARCHAR(300),
      guild_id VARCHAR(300)
    );
    CREATE TABLE IF NOT EXISTS do_you_think_answers (
      id BIGSERIAL PRIMARY KEY NOT NULL,
      answer VARCHAR(300),
      guild_id VARCHAR(300)
    );
    CREATE TABLE IF NOT EXISTS how_answers (
      id BIGSERIAL PRIMARY KEY NOT NULL,
      answer VARCHAR(300),
      guild_id VARCHAR(300)
    );
    CREATE TABLE IF NOT EXISTS who_answers (
      id BIGSERIAL PRIMARY KEY NOT NULL,
      answer VARCHAR(300),
      guild_id VARCHAR(300)
    );
    CREATE TABLE IF NOT EXISTS what_answers (
      id BIGSERIAL PRIMARY KEY NOT NULL,
      answer VARCHAR(300),
      guild_id VARCHAR(300)
    );
  `;
  await client.query(createTablesQuery);
  console.log(`Created tables.`);
  await client.end();
};

module.exports = { setupDatabase };
