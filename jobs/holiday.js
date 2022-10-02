const cron = require("node-cron");
const { getHoliday } = require("../utils/commands/holidayUtils");

const sendDailyHolidayInfo = async (client) => {
  cron.schedule(
    "0 12 7 * * *",
    async () => {
      const [holiday] = await getHoliday("972581289972596756");

      client.guilds.cache
        .get("733001624427036825")
        .channels.cache.get("993197778685657180")
        .send(holiday.message);
    },
    { timezone: "Europe/Warsaw" }
  );
};

module.exports = { sendDailyHolidayInfo };
