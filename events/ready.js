const { setupDatabase } = require("../database/setupDatabase");
const { sendDailyBirthDayInfo } = require("../jobs/birthday");
const { sendDailyHolidayInfo } = require("../jobs/holiday");
const { sendValentineToEveryone } = require("../jobs/valentine");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    setupDatabase();
    sendDailyHolidayInfo(client);
    sendDailyBirthDayInfo(client);
    sendValentineToEveryone(client);
    client.user.setActivity("starożytne księgi", { type: "WATCHING" });
    console.log("Bot is online");
    const guild = await client.guilds.cache.get("733001624427036825");
    const guildMembers = await guild.members.fetch();
    console.log(guildMembers);
    console.log(typeof guildMembers);
    console.log(
      Array.from(guildMembers).forEach(() => {
        console.log(Array.from(guildMembers).length);
      })
    );
  },
};
