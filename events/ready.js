const { sendDailyBirthDayInfo } = require("../jobs/birthday");
const { sendDailyHolidayInfo } = require("../jobs/holiday");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    sendDailyHolidayInfo(client);
    sendDailyBirthDayInfo(client);
    client.user.setActivity("starożytne księgi", { type: "WATCHING" });
    console.log("Bot is online");
  },
};
