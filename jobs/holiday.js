const cron = require("node-cron");
const { getHoliday } = require("../utils/commands/holidayUtils");
const { getHolidaysConfig } = require("../utils/index");

const sendDailyHolidayInfo = async (client) => {
  const holidaysConfig = await getHolidaysConfig();

  holidaysConfig.forEach((holidaysConfigItem) => {
    cron.schedule(
      "0 0 6 * * *",
      async () => {
        const holiday = await getHoliday(holidaysConfigItem.guildId);
        client.guilds.cache
          .get(holidaysConfigItem.guildId)
          .channels.cache.get(holidaysConfigItem.holidayAnnouncementChannelId)
          .send(holiday.message);
      },
      { timezone: "Europe/Warsaw" }
    );
  });
};

module.exports = { sendDailyHolidayInfo };
