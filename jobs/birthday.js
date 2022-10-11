const cron = require("node-cron");
const { getBirthday } = require("../utils/jobs/birthdayUtils");

const sendDailyBirthDayInfo = async (client) => {
  console.log(holiday);
  cron.schedule(
    "0 0 0 * * *",
    async () => {
      const birthdays = await getBirthday("733001624427036825");

      if (birthdays.length > 1) {
        const text = `Urodziny dzisiaj obchodzą: ${birthdays
          .map((value) => `<@${value.user_id}>`)
          .join(", ")}. Wszystkiego najlepszego dla naszych solenizantów!`;

        client.guilds.cache
          .get("733001624427036825")
          .channels.cache.get("993197778685657180")
          .send(text);
      }
    },
    { timezone: "Europe/Warsaw" }
  );
};

module.exports = { sendDailyBirthDayInfo };
