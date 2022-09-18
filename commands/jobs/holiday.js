const { isAdmin } = require("../../utils");
const cron = require("node-cron");

const main = (message, args) => {
  if (!isAdmin(message))
    return message.channel.send("Tylko administrator może używać tej komendy.");

  cron.schedule(
    "0 0 6 * * *",
    () => {
      message.channel.send("Test");
    },
    { timezone: "Europe/Warsaw" }
  );
};

module.exports = {
  name: "swietuj",
  description: "Ustaw powiadomienia o świętach",
  usage: "!swietuj",
  execute: async (message, args) => main(message, args),
};
