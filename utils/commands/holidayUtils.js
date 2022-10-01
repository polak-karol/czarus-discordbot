const { getClient } = require("../../database/getClient");
const moment = require("moment");

const getHoliday = async (guildId) => {
  const client = await getClient();

  const entries = await client.query(
    `SELECT * FROM holidays WHERE date = '2022-10-17' AND guild_id = '${guildId}';`
  );

  await client.end();

  return entries.rows;
};

module.exports = { getHoliday };
