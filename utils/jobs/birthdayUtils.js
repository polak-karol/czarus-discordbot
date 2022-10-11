const { getClient } = require("../../database/getClient");

const getBirthday = async (guildId) => {
  const client = await getClient();

  const entries = await client.query(
    `SELECT * FROM birthdays WHERE EXTRACT(DAY FROM date) = EXTRACT(DAY FROM current_date) AND EXTRACT(MONTH FROM date) = EXTRACT(MONTH FROM current_date) AND guild_id = '${guildId}';`
  );

  await client.end();

  return entries.rows;
};

module.exports = { getBirthday };
