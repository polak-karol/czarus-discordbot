const { MessageEmbed } = require("discord.js");
const {
  getRandomInteger,
  hasArgs,
  isHelpArg,
  removeDiacritics,
} = require("../../utils");
const { whoResponses } = require("../../utils/commands/funUtils");

const getHelpEmbed = () =>
  new MessageEmbed()
    .setTitle("!kto")
    .setDescription("Zapytaj mnie kto...? \n Przykład: `!kto Cię stworzył?`");

const main = async (message, args) => {
  if (!hasArgs(args)) return message.reply("kto co?");
  if (isHelpArg(args)) return message.reply({ embeds: [getHelpEmbed()] });

  message.reply(whoResponses[getRandomInteger(0, whoResponses.length)]);
};

module.exports = {
  name: "kto",
  description: "Zapytaj mnie kto...?",
  usage: "!kto",
  execute: (message, args) => main(message, args),
};
