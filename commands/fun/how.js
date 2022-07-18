const { MessageEmbed } = require("discord.js");
const { getRandomInteger, hasArgs, isHelpArg } = require("../../utils");
const { howResponses } = require("../../utils/commands/funUtils");

const getHelpEmbed = () =>
  new MessageEmbed()
    .setTitle("!jak")
    .setDescription("Zapytaj mnie jak...? \n Przykład: `!jak to robisz?`");

const main = async (message, args) => {
  if (!hasArgs(args)) return message.reply("Jak co?");
  if (isHelpArg(args)) return message.reply({ embeds: [getHelpEmbed()] });

  message.reply(howResponses[getRandomInteger(0, howResponses.length)]);
};

module.exports = {
  name: "jak",
  description: "Zapytaj mnie jak...?",
  usage: "!jak",
  execute: (message, args) => main(message, args),
};
