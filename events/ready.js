const { setupDatabase } = require("../database/setupDatabase");
const { sendDailyBirthDayInfo } = require("../jobs/birthday");
const { sendDailyHolidayInfo } = require("../jobs/holiday");
const { sendValentineToEveryone } = require("../jobs/valentine");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    setupDatabase();
    sendDailyHolidayInfo(client);
    sendDailyBirthDayInfo(client);
    sendValentineToEveryone(client);
    client.user.setActivity("starożytne księgi", { type: "WATCHING" });
    console.log("Bot is online");
  },
};
