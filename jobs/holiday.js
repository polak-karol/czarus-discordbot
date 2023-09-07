const cron = require("node-cron");
const { getHoliday } = require("../utils/commands/holidayUtils");

const sendDailyHolidayInfo = async (client) => {
  cron.schedule(
    "0 57 17 * * *",
    async () => {
      const holiday = await getHoliday("733001624427036825");

      client.guilds.cache
        .get("733001624427036825")
        .channels.cache.get("993459590899437630")
        .send(holiday.message);
    },
    { timezone: "Europe/Warsaw" }
  );
};

module.exports = { sendDailyHolidayInfo };
