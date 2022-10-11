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
    CREATE TABLE IF NOT EXISTS jobs(
      id BIGSERIAL PRIMARY KEY NOT NULL,
      holiday_active BOOLEAN,
      holiday_channel_id VARCHAR(300),
      holiday_time TIME,
      guild_id VARCHAR(300) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS holidays(
      id BIGSERIAL PRIMARY KEY NOT NULL,
      message TEXT NOT NULL,
      image TEXT,
      date DATE NOT NULL,
      guild_id VARCHAR(300) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS birthdays(
      id BIGSERIAL PRIMARY KEY NOT NULL,
      date DATE NOT NULL,
      is_anonymous BOOLEAN NOT NULL,
      user_id VARCHAR(300) NOT NULL,
      guild_id VARCHAR(300) NOT NULL
    );
  `;
  const createResult = await client.query(createTablesQuery);

  if (createResult) console.log("Created tables.");
  await client.end();
};

module.exports = { setupDatabase };
