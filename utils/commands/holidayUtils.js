const { getClient } = require("../../database/getClient");
const moment = require("moment");

const getHoliday = async (guildId) => {
  const client = await getClient();

  const entries = await client.query(
    `SELECT * FROM holidays WHERE date = '${moment().format(
      "YYYY-MM-DD"
    )}' AND guild_id = '${guildId}';`
  );

  await client.end();

  return entries.rows;
};

module.exports = { getHoliday };
