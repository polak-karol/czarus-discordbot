const { getClient } = require("./getClient");

const setupDatabase = async () => {
  const client = await getClient();
  const createTablesQuery = `
    CREATE TABLE IF NOT EXISTS answers(
      id BIGSERIAL PRIMARY KEY NOT NULL,
      why_answers TEXT ARRAY,
      does_answers TEXT ARRAY,
      when_answers TEXT ARRAY,
      what_do_you_think_answers TEXT ARRAY,
      how_answers TEXT ARRAY,
      who_answers TEXT ARRAY,
      what_answers TEXT ARRAY,
      what_is_answers TEXT ARRAY,
      guild_id VARCHAR(300),
      channel_id VARCHAR(300)
    );
  `;
  await client.query(createTablesQuery);

  console.log("Created tables.");
  await client.end();
};

module.exports = { setupDatabase };
