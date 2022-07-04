const { isAdmin } = require("../../utils");

module.exports = {
  name: "bump",
  description: "test opis",
  usage: "!bump",
  execute: async (message, args) => {
    if (!isAdmin(message))
      return message.channel.send(
        "Tylko administrator może używać tej komendy."
      );

    message.channel.send("/bump");
    setInterval(() => {
      message.channel.send("/bump");
    }, 10000);
  },
};
