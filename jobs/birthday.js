const cron = require("node-cron");
const { getRandomInteger } = require("../utils");
const {
  getBirthday,
  wishesPlural,
  wishesSingular,
} = require("../utils/jobs/birthdayUtils");

const sendDailyBirthDayInfo = async (client) => {
  cron.schedule(
    "0 30 18 * * *",
    async () => {
      const birthdays = await getBirthday("972581289972596756");

      if (birthdays.length > 0) {
        const text = `<@&986163091089809428> Urodziny dzisiaj ${
          birthdays.length > 1 ? "obchodzą" : "obchodzi"
        }:\n${birthdays
          .map((value) => `<@${value.user_id}>`)
          .join(", ")}. \n\n${
          birthdays.length > 1
            ? wishesPlural[getRandomInteger(0, wishesPlural.length)]
            : wishesSingular[getRandomInteger(0, wishesSingular.length)]
        }`;

        client.guilds.cache
          .get("972581289972596756")
          .channels.cache.get("977480739929075782")
          .send(text);
      }
    },
    { timezone: "Europe/Warsaw" }
  );
};

module.exports = { sendDailyBirthDayInfo };
