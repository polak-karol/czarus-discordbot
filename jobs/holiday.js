const cron = require("node-cron");
const moment = require("moment");
const { getHoliday } = require("../utils/commands/holidayUtils");

const sendDailyHolidayInfo = (client) => {
  console.log(moment().format("YYYY-MM-DD"));
  cron.schedule(
    "0 11 9 * * *",
    () => {
      client.guilds.cache
        .get("733001624427036825")
        .channels.cache.get("993197778685657180")
        .send(getHoliday("972581289972596756")[0].message);
    },
    { timezone: "Europe/Warsaw" }
  );
};

module.exports = { sendDailyHolidayInfo };
