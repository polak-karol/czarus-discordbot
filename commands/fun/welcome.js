const main = async (message, args) => {
  message.reply("No witaj.");
};

module.exports = {
  name: "czesc",
  description: "Powitaj Czarka",
  usage: "!czesc",
  execute: (message, args) => main(message, args),
};
