const cron = require("node-cron");
const { getHoliday } = require("../utils/commands/holidayUtils");

const sendDailyHolidayInfo = async (client) => {
  cron.schedule(
    "0 20 8 * * *",
    async () => {
      const [holiday] = await getHoliday("972581289972596756");

      client.guilds.cache
        .get("972581289972596756")
        .channels.cache.get("1001790827091198033")
        .send(holiday.message);
    },
    { timezone: "Europe/Warsaw" }
  );
};

module.exports = { sendDailyHolidayInfo };
