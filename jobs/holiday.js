const cron = require("node-cron");
const { getHoliday } = require("../utils/commands/holidayUtils");
const { getGuildsSettings } = require("../utils/index");

const sendDailyHolidayInfo = async (client) => {
  const guildsSettings = await getGuildsSettings();

  guildsSettings.forEach((guildSettings) => {
    cron.schedule(
      "0 0 6 * * *",
      async () => {
        const holiday = await getHoliday(guildSettings.guildId);
        client.guilds.cache
          .get(guildSettings.guildId)
          .channels.cache.get(guildSettings.holidayChannelId)
          .send(holiday.message);
      },
      { timezone: "Europe/Warsaw" }
    );
  });
};

module.exports = { sendDailyHolidayInfo };
