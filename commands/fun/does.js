const { MessageEmbed } = require("discord.js");
const { getRandomInteger, hasArgs, isHelpArg } = require("../../utils");
const { doesResponse } = require("../../utils/commands/funUtils");

const getHelpEmbed = () =>
  new MessageEmbed()
    .setTitle("!czy")
    .setDescription("Zapytaj mnie czy... ? \n Przykład: `!czy ?`");

const main = async (message, args) => {
  if (!hasArgs(args)) return message.reply("Czy co?");
  if (isHelpArg(args)) return message.reply({ embeds: [getHelpEmbed()] });

  message.reply(doesResponse[getRandomInteger(0, doesResponse.length)]);
};

module.exports = {
  name: "czy",
  description: "Zapytaj mnie czy... ?",
  usage: "!czy",
  execute: (message, args) => main(message, args),
};
