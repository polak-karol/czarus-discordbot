const cron = require("node-cron");

const sendDailyHolidayInfo = (client) => {
  cron.schedule(
    "0 0 6 * * *",
    () => {
      client.guilds.cache
        .get("733001624427036825")
        .channels.cache.get("993197778685657180")
        .send("Test");
    },
    { timezone: "Europe/Warsaw" }
  );
};

module.exports = { sendDailyHolidayInfo };
